<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsController extends Controller
{
    public function index()
    {
        $newsList = DB::table('news')->orderByDesc('id')->get();
        return view('noi-bo.news', compact('newsList'));
    }

    public function create()
    {
        return view('noi-bo.news-create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'news_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
            'created_at' => 'nullable|date',
        ]);

        if ($request->hasFile('news_image')) {
            $file = $request->file('news_image');
            $filename = 'news-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadPath = public_path('upload/News');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $imagePath = '/upload/News/' . $filename;

            DB::table('news')->insert([
                'title' => $request->title,
                'summary' => $request->summary,
                'content' => $request->content,
                'image_path' => $imagePath,
                'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
                'created_at' => $request->filled('created_at') ? $request->created_at : now(),
                'updated_at' => now(),
            ]);

            return redirect('/admin/news')->with('success', 'Đăng tin tức thành công!');
        }

        return back()->withErrors(['news_image' => 'Vui lòng tải lên ảnh đại diện tin tức.'])->withInput();
    }

    public function edit($id)
    {
        $news = DB::table('news')->where('id', $id)->first();
        if (!$news) {
            abort(404, 'Bài viết không tồn tại.');
        }
        return view('noi-bo.news-edit', compact('news'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'news_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
            'created_at' => 'nullable|date',
        ]);

        $news = DB::table('news')->where('id', $id)->first();
        if (!$news) {
            return redirect('/admin/news')->withErrors(['error' => 'Bài viết không tồn tại.']);
        }

        $imagePath = $news->image_path;

        if ($request->hasFile('news_image')) {
            // Delete old file
            $oldFilepath = public_path($news->image_path);
            if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                unlink($oldFilepath);
            }

            // Upload new file
            $file = $request->file('news_image');
            $filename = 'news-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $uploadPath = public_path('upload/News');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            $file->move($uploadPath, $filename);
            $imagePath = '/upload/News/' . $filename;
        }

        $updateData = [
            'title' => $request->title,
            'summary' => $request->summary,
            'content' => $request->content,
            'image_path' => $imagePath,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'updated_at' => now(),
        ];

        if ($request->filled('created_at')) {
            $updateData['created_at'] = $request->created_at;
        }

        DB::table('news')->where('id', $id)->update($updateData);

        return redirect('/admin/news')->with('success', 'Cập nhật bài viết thành công!');
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $news = DB::table('news')->where('id', $request->id)->first();
        if ($news) {
            $newStatus = !$news->is_visible;
            DB::table('news')->where('id', $request->id)->update([
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
            'message' => 'Bài viết không tồn tại.',
        ], 404);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $news = DB::table('news')->where('id', $request->id)->first();
        if ($news) {
            $filepath = public_path($news->image_path);
            if (file_exists($filepath) && is_file($filepath)) {
                unlink($filepath);
            }
            DB::table('news')->where('id', $request->id)->delete();
            return redirect('/admin/news')->with('success', 'Đã xóa tin tức thành công!');
        }

        return redirect('/admin/news')->withErrors(['error' => 'Không tìm thấy tin tức để xóa.']);
    }

    // Public News API endpoints for React
    public function apiIndex()
    {
        // Only return visible news for public client pages
        $newsList = DB::table('news')->where('is_visible', true)->orderByDesc('id')->get();
        return response()->json($newsList);
    }

    public function apiDetail($id)
    {
        $news = DB::table('news')->where('id', $id)->first();
        if (!$news) {
            return response()->json(['message' => 'Tin tức không tồn tại.'], 404);
        }
        return response()->json($news);
    }
}
