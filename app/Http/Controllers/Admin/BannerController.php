<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BannerController extends Controller
{
    public function index()
    {
        $bannerDir = base_path('resources/react-app/assets/images-banner');
        if (!file_exists($bannerDir)) {
            mkdir($bannerDir, 0755, true);
        }
        
        $files = array_diff(scandir($bannerDir), ['.', '..']);
        $banners = [];
        foreach ($files as $file) {
            if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['jpg', 'jpeg', 'png', 'webp'])) {
                $banners[] = [
                    'filename' => $file,
                    'url' => '/api/banner-image/' . $file
                ];
            }
        }

        // reverse sort to show newest first if they use timestamp naming
        rsort($banners);

        $activeBanner = DB::table('banners')->where('is_active', true)->orderByDesc('id')->first();
        
        return view('noi-bo.banner', compact('banners', 'activeBanner'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'banner_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('banner_image')) {
            $file = $request->file('banner_image');
            $filename = 'banner-' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(base_path('resources/react-app/assets/images-banner'), $filename);

            return back()->with('success', 'Tải ảnh banner lên thành công!');
        }

        return back()->withErrors(['banner_image' => 'Vui lòng chọn một ảnh.']);
    }

    public function activate(Request $request)
    {
        $request->validate([
            'filename' => 'required|string'
        ]);

        DB::table('banners')->update(['is_active' => false]);

        DB::table('banners')->insert([
            'image_path' => $request->filename,
            'is_active' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return back()->with('success', 'Đã đặt ảnh thành banner hiển thị!');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'filename' => 'required|string'
        ]);

        $filepath = base_path('resources/react-app/assets/images-banner/' . $request->filename);
        
        // Also check if it's the active banner, if so, we shouldn't delete or we should deactivate it.
        $activeBanner = DB::table('banners')->where('is_active', true)->orderByDesc('id')->first();
        if ($activeBanner && $activeBanner->image_path === $request->filename) {
            return back()->withErrors(['error' => 'Không thể xóa banner đang được hiển thị. Vui lòng chọn banner khác trước.']);
        }

        if (file_exists($filepath)) {
            unlink($filepath);
            return back()->with('success', 'Đã xóa banner!');
        }

        return back()->withErrors(['error' => 'Không tìm thấy file ảnh.']);
    }

    // API endpoint for React frontend
    public function apiIndex()
    {
        $banner = DB::table('banners')->where('is_active', true)->orderByDesc('id')->first();

        if ($banner) {
            if (str_starts_with($banner->image_path, '/')) {
                return response()->json([
                    'image_url' => $banner->image_path,
                ]);
            }
            return response()->json([
                'image_url' => '/api/banner-image/' . $banner->image_path,
            ]);
        }

        return response()->json([
            'image_url' => '/uploads/banners/default-banner.png',
        ]);
    }
}
