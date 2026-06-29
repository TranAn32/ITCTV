<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function index()
    {
        $projectsList = DB::table('projects')->orderByDesc('id')->get();
        return view('noi-bo.projects', compact('projectsList'));
    }

    public function create()
    {
        return view('noi-bo.projects-create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'scope' => 'required|string',
            'value' => 'nullable|string|max:255',
            'package_value' => 'nullable|string|max:255',
            'details' => 'nullable|string',
            'project_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
        ]);

        if ($request->hasFile('project_image')) {
            $file = $request->file('project_image');
            $filename = 'project-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadPath = public_path('upload/Projects');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $imagePath = '/upload/Projects/' . $filename;

            DB::table('projects')->insert([
                'title' => $request->title,
                'client' => $request->client,
                'category' => $request->category,
                'scope' => $request->scope,
                'value' => $request->value,
                'package_value' => $request->package_value,
                'details' => $request->details,
                'image_path' => $imagePath,
                'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect('/admin/projects')->with('success', 'Đăng dự án thành công!');
        }

        return back()->withErrors(['project_image' => 'Vui lòng tải lên ảnh đại diện dự án.'])->withInput();
    }

    public function edit($id)
    {
        $project = DB::table('projects')->where('id', $id)->first();
        if (!$project) {
            abort(404, 'Dự án không tồn tại.');
        }
        return view('noi-bo.projects-edit', compact('project'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'client' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'scope' => 'required|string',
            'value' => 'nullable|string|max:255',
            'package_value' => 'nullable|string|max:255',
            'details' => 'nullable|string',
            'project_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
        ]);

        $project = DB::table('projects')->where('id', $id)->first();
        if (!$project) {
            return redirect('/admin/projects')->withErrors(['error' => 'Dự án không tồn tại.']);
        }

        $imagePath = $project->image_path;

        if ($request->hasFile('project_image')) {
            // Delete old file
            $oldFilepath = public_path($project->image_path);
            if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                unlink($oldFilepath);
            }

            // Upload new file
            $file = $request->file('project_image');
            $filename = 'project-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $uploadPath = public_path('upload/Projects');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            $file->move($uploadPath, $filename);
            $imagePath = '/upload/Projects/' . $filename;
        }

        DB::table('projects')->where('id', $id)->update([
            'title' => $request->title,
            'client' => $request->client,
            'category' => $request->category,
            'scope' => $request->scope,
            'value' => $request->value,
            'package_value' => $request->package_value,
            'details' => $request->details,
            'image_path' => $imagePath,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'updated_at' => now(),
        ]);

        return redirect('/admin/projects')->with('success', 'Cập nhật dự án thành công!');
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $project = DB::table('projects')->where('id', $request->id)->first();
        if ($project) {
            $newStatus = !$project->is_visible;
            DB::table('projects')->where('id', $request->id)->update([
                'is_visible' => $newStatus,
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'is_visible' => $newStatus,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Dự án không tồn tại.',
        ], 404);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $project = DB::table('projects')->where('id', $request->id)->first();
        if ($project) {
            $filepath = public_path($project->image_path);
            if (file_exists($filepath) && is_file($filepath)) {
                unlink($filepath);
            }
            DB::table('projects')->where('id', $request->id)->delete();
            return redirect('/admin/projects')->with('success', 'Đã xóa dự án thành công!');
        }

        return redirect('/admin/projects')->withErrors(['error' => 'Không tìm thấy dự án để xóa.']);
    }

    public function apiIndex()
    {
        $projectsList = DB::table('projects')->where('is_visible', true)->orderByDesc('id')->get();
        
        $mappedProjects = $projectsList->map(function ($project) {
            $detailsArray = [];
            if (!empty($project->details)) {
                $detailsArray = array_values(array_filter(array_map('trim', explode("\n", $project->details))));
            }
            
            return [
                'id' => (string)$project->id,
                'title' => $project->title,
                'client' => $project->client,
                'category' => $project->category,
                'scope' => $project->scope,
                'value' => $project->value,
                'packageValue' => $project->package_value,
                'details' => $detailsArray,
                'image_path' => $project->image_path,
            ];
        });

        return response()->json($mappedProjects);
    }
}
