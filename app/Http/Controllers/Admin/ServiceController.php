<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function index()
    {
        $servicesList = DB::table('services')->orderBy('sort_order')->orderBy('id')->get();
        return view('noi-bo.services', compact('servicesList'));
    }

    public function create()
    {
        return view('noi-bo.services-create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'required|string|max:255|unique:services,slug',
            'title' => 'required|string|max:255',
            'short_title' => 'required|string|max:255',
            'summary' => 'required|string',
            'icon' => 'required|string|max:100',
            'tag' => 'required|string|max:100',
            'color_theme' => 'required|string|max:100',
            'items' => 'required|string',
            'sort_order' => 'required|integer',
            'is_visible' => 'nullable|in:0,1',
            'service_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $imagePath = null;
        if ($request->hasFile('service_image')) {
            $file = $request->file('service_image');
            $filename = 'service-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadPath = public_path('upload/Services');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $imagePath = '/upload/Services/' . $filename;
        }

        DB::table('services')->insert([
            'slug' => $request->slug,
            'title' => $request->title,
            'short_title' => $request->short_title,
            'summary' => $request->summary,
            'icon' => $request->icon,
            'tag' => $request->tag,
            'color_theme' => $request->color_theme,
            'items' => $request->items,
            'sort_order' => $request->sort_order,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'image_path' => $imagePath,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect('/admin/services')->with('success', 'Thêm dịch vụ thành công!');
    }

    public function edit($id)
    {
        $service = DB::table('services')->where('id', $id)->first();
        if (!$service) {
            abort(404, 'Dịch vụ không tồn tại.');
        }
        return view('noi-bo.services-edit', compact('service'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'slug' => 'required|string|max:255|unique:services,slug,' . $id,
            'title' => 'required|string|max:255',
            'short_title' => 'required|string|max:255',
            'summary' => 'required|string',
            'icon' => 'required|string|max:100',
            'tag' => 'required|string|max:100',
            'color_theme' => 'required|string|max:100',
            'items' => 'required|string',
            'sort_order' => 'required|integer',
            'is_visible' => 'nullable|in:0,1',
            'service_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $service = DB::table('services')->where('id', $id)->first();
        if (!$service) {
            return redirect('/admin/services')->withErrors(['error' => 'Dịch vụ không tồn tại.']);
        }

        $imagePath = $service->image_path;

        if ($request->hasFile('service_image')) {
            // Delete old file if exists
            if ($service->image_path) {
                $oldFilepath = public_path($service->image_path);
                if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                    unlink($oldFilepath);
                }
            }

            // Upload new file
            $file = $request->file('service_image');
            $filename = 'service-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadPath = public_path('upload/Services');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $imagePath = '/upload/Services/' . $filename;
        } elseif ($request->has('delete_image') && $request->delete_image == '1') {
            // Delete old file if request specifies deletion
            if ($service->image_path) {
                $oldFilepath = public_path($service->image_path);
                if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                    unlink($oldFilepath);
                }
            }
            $imagePath = null;
        }

        DB::table('services')->where('id', $id)->update([
            'slug' => $request->slug,
            'title' => $request->title,
            'short_title' => $request->short_title,
            'summary' => $request->summary,
            'icon' => $request->icon,
            'tag' => $request->tag,
            'color_theme' => $request->color_theme,
            'items' => $request->items,
            'sort_order' => $request->sort_order,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'image_path' => $imagePath,
            'updated_at' => now(),
        ]);

        return redirect('/admin/services')->with('success', 'Cập nhật dịch vụ thành công!');
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $service = DB::table('services')->where('id', $request->id)->first();
        if ($service) {
            $newStatus = !$service->is_visible;
            DB::table('services')->where('id', $request->id)->update([
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
            'message' => 'Dịch vụ không tồn tại.',
        ], 404);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $service = DB::table('services')->where('id', $request->id)->first();
        if ($service) {
            // Delete the image file if exists
            if ($service->image_path) {
                $filepath = public_path($service->image_path);
                if (file_exists($filepath) && is_file($filepath)) {
                    unlink($filepath);
                }
            }

            DB::table('services')->where('id', $request->id)->delete();
            return redirect('/admin/services')->with('success', 'Đã xóa dịch vụ thành công!');
        }

        return redirect('/admin/services')->withErrors(['error' => 'Không tìm thấy dịch vụ để xóa.']);
    }

    public function apiIndex()
    {
        $servicesList = DB::table('services')
            ->where('is_visible', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        $mappedServices = $servicesList->map(function ($service) {
            $itemsArray = [];
            if (!empty($service->items)) {
                $lines = array_values(array_filter(array_map('trim', explode("\n", $service->items))));
                foreach ($lines as $line) {
                    $itemsArray[] = ['text' => $line];
                }
            }

            return [
                'id' => $service->slug,
                'title' => $service->title,
                'shortTitle' => $service->short_title,
                'summary' => $service->summary,
                'icon' => $service->icon,
                'tag' => $service->tag,
                'colorTheme' => $service->color_theme,
                'items' => $itemsArray,
                'image_path' => $service->image_path,
            ];
        });

        return response()->json($mappedServices);
    }
}
