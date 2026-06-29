<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GalleryController extends Controller
{
    public function index()
    {
        $galleryList = DB::table('gallery_images')->orderBy('sort_order')->orderByDesc('id')->get();
        return view('noi-bo.gallery', compact('galleryList'));
    }

    public function create()
    {
        return view('noi-bo.gallery-create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'gallery_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'caption' => 'nullable|string|max:500',
            'sort_order' => 'nullable|integer',
            'is_visible' => 'nullable|in:0,1',
        ]);

        if ($request->hasFile('gallery_image')) {
            $file = $request->file('gallery_image');
            $filename = 'gallery-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();

            $uploadPath = public_path('upload/Gallery');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $imagePath = '/upload/Gallery/' . $filename;

            DB::table('gallery_images')->insert([
                'image_path' => $imagePath,
                'caption' => $request->caption,
                'sort_order' => $request->sort_order ?? 0,
                'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect('/admin/gallery')->with('success', 'Thêm hình ảnh thành công!');
        }

        return back()->withErrors(['gallery_image' => 'Vui lòng tải lên hình ảnh.'])->withInput();
    }

    public function edit($id)
    {
        $galleryImage = DB::table('gallery_images')->where('id', $id)->first();
        if (!$galleryImage) {
            abort(404, 'Hình ảnh không tồn tại.');
        }
        return view('noi-bo.gallery-edit', compact('galleryImage'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'gallery_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'caption' => 'nullable|string|max:500',
            'sort_order' => 'nullable|integer',
            'is_visible' => 'nullable|in:0,1',
        ]);

        $galleryImage = DB::table('gallery_images')->where('id', $id)->first();
        if (!$galleryImage) {
            return redirect('/admin/gallery')->withErrors(['error' => 'Hình ảnh không tồn tại.']);
        }

        $imagePath = $galleryImage->image_path;

        if ($request->hasFile('gallery_image')) {
            // Delete old file
            $oldFilepath = public_path($galleryImage->image_path);
            if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                unlink($oldFilepath);
            }

            // Upload new file
            $file = $request->file('gallery_image');
            $filename = 'gallery-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $uploadPath = public_path('upload/Gallery');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            $file->move($uploadPath, $filename);
            $imagePath = '/upload/Gallery/' . $filename;
        }

        DB::table('gallery_images')->where('id', $id)->update([
            'image_path' => $imagePath,
            'caption' => $request->caption,
            'sort_order' => $request->sort_order ?? 0,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'updated_at' => now(),
        ]);

        return redirect('/admin/gallery')->with('success', 'Cập nhật hình ảnh thành công!');
    }

    public function toggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $galleryImage = DB::table('gallery_images')->where('id', $request->id)->first();
        if ($galleryImage) {
            $newStatus = !$galleryImage->is_visible;
            DB::table('gallery_images')->where('id', $request->id)->update([
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
            'message' => 'Hình ảnh không tồn tại.',
        ], 404);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $galleryImage = DB::table('gallery_images')->where('id', $request->id)->first();
        if ($galleryImage) {
            $filepath = public_path($galleryImage->image_path);
            if (file_exists($filepath) && is_file($filepath)) {
                unlink($filepath);
            }
            DB::table('gallery_images')->where('id', $request->id)->delete();
            return redirect('/admin/gallery')->with('success', 'Đã xóa hình ảnh thành công!');
        }

        return redirect('/admin/gallery')->withErrors(['error' => 'Không tìm thấy hình ảnh để xóa.']);
    }

    public function apiIndex()
    {
        $galleryList = DB::table('gallery_images')
            ->where('is_visible', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();

        $mappedGallery = $galleryList->map(function ($image) {
            return [
                'id' => $image->id,
                'image_path' => $image->image_path,
                'caption' => $image->caption,
                'created_at' => $image->created_at,
            ];
        });

        return response()->json($mappedGallery);
    }
}
