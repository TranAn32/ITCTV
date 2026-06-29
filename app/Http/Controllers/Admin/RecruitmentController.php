<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecruitmentController extends Controller
{
    public function index()
    {
        $recruitments = DB::table('recruitments')->orderByDesc('id')->get();
        return view('noi-bo.recruitments', compact('recruitments'));
    }

    public function create()
    {
        return view('noi-bo.recruitments-create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'required|string|max:100',
            'salary_range' => 'nullable|string|max:255',
            'experience' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'is_visible' => 'nullable|in:0,1',
        ]);

        DB::table('recruitments')->insert([
            'title' => $request->title,
            'department' => $request->department,
            'location' => $request->location,
            'employment_type' => $request->employment_type,
            'salary_range' => $request->salary_range,
            'experience' => $request->experience,
            'deadline' => $request->deadline,
            'description' => $request->description,
            'requirements' => $request->requirements,
            'benefits' => $request->benefits,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect('/admin/recruitments')->with('success', 'Đăng tin tuyển dụng thành công!');
    }

    public function edit($id)
    {
        $recruitment = DB::table('recruitments')->where('id', $id)->first();
        if (!$recruitment) {
            abort(404, 'Tin tuyển dụng không tồn tại.');
        }
        return view('noi-bo.recruitments-edit', compact('recruitment'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'required|string|max:100',
            'salary_range' => 'nullable|string|max:255',
            'experience' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'benefits' => 'nullable|string',
            'is_visible' => 'nullable|in:0,1',
        ]);

        $recruitment = DB::table('recruitments')->where('id', $id)->first();
        if (!$recruitment) {
            return redirect('/admin/recruitments')->withErrors(['error' => 'Tin tuyển dụng không tồn tại.']);
        }

        DB::table('recruitments')->where('id', $id)->update([
            'title' => $request->title,
            'department' => $request->department,
            'location' => $request->location,
            'employment_type' => $request->employment_type,
            'salary_range' => $request->salary_range,
            'experience' => $request->experience,
            'deadline' => $request->deadline,
            'description' => $request->description,
            'requirements' => $request->requirements,
            'benefits' => $request->benefits,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'updated_at' => now(),
        ]);

        return redirect('/admin/recruitments')->with('success', 'Cập nhật tin tuyển dụng thành công!');
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $recruitment = DB::table('recruitments')->where('id', $request->id)->first();
        if ($recruitment) {
            $newStatus = !$recruitment->is_visible;
            DB::table('recruitments')->where('id', $request->id)->update([
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
            'message' => 'Tin tuyển dụng không tồn tại.',
        ], 404);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $recruitment = DB::table('recruitments')->where('id', $request->id)->first();
        if ($recruitment) {
            DB::table('recruitments')->where('id', $request->id)->delete();
            return redirect('/admin/recruitments')->with('success', 'Đã xóa tin tuyển dụng thành công!');
        }

        return redirect('/admin/recruitments')->withErrors(['error' => 'Không tìm thấy tin tuyển dụng để xóa.']);
    }

    // Public Recruitment API for React frontend
    public function apiIndex()
    {
        $recruitments = DB::table('recruitments')
            ->where('is_visible', true)
            ->orderByDesc('id')
            ->get();

        return response()->json($recruitments);
    }
}
