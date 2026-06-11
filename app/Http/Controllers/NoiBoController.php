<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class NoiBoController extends Controller
{
    public function index()
    {
        return redirect('/admin/banner');
    }

    public function login()
    {
        return view('noi-bo.login');
    }

    public function authenticate(Request $request)
    {
        $request->validate([
            'access_code' => 'required|string',
        ]);

        $setting = DB::table('settings')->where('key', 'portal_access_code')->first();

        if ($setting && Hash::check($request->access_code, $setting->value)) {
            $request->session()->put('noibo_authenticated', true);
            return redirect('/admin');
        }

        return back()->withErrors([
            'access_code' => 'Mã truy cập không hợp lệ.',
        ]);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('noibo_authenticated');
        return redirect('/admin/login');
    }

    public function accessCode()
    {
        return view('noi-bo.access-code');
    }

    public function updateAccessCode(Request $request)
    {
        $request->validate([
            'current_code' => 'required|string',
            'new_code' => 'required|string|min:4|confirmed',
        ]);

        $setting = DB::table('settings')->where('key', 'portal_access_code')->first();

        if (!$setting || !Hash::check($request->current_code, $setting->value)) {
            return back()->withErrors(['current_code' => 'Mã truy cập hiện tại không đúng.']);
        }

        DB::table('settings')
            ->where('key', 'portal_access_code')
            ->update(['value' => Hash::make($request->new_code)]);

        return back()->with('success', 'Đổi mã truy cập thành công.');
    }

    // Banner Management
    public function banner()
    {
        $banner = DB::table('banners')->where('is_active', true)->orderByDesc('id')->first();
        return view('noi-bo.banner', compact('banner'));
    }

    public function updateBanner(Request $request)
    {
        $request->validate([
            'banner_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('banner_image')) {
            $file = $request->file('banner_image');
            $filename = 'banner-' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/banners'), $filename);

            // Deactivate all existing banners
            DB::table('banners')->update(['is_active' => false]);

            // Insert new active banner
            DB::table('banners')->insert([
                'image_path' => '/uploads/banners/' . $filename,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return back()->with('success', 'Cập nhật banner thành công!');
        }

        return back()->withErrors(['banner_image' => 'Vui lòng chọn một ảnh.']);
    }

    // API endpoint for React frontend
    public function apiBanner()
    {
        $banner = DB::table('banners')->where('is_active', true)->orderByDesc('id')->first();

        if ($banner) {
            return response()->json([
                'image_url' => $banner->image_path,
            ]);
        }

        return response()->json([
            'image_url' => '/uploads/banners/default-banner.png',
        ]);
    }
}
