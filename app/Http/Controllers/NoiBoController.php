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

    public function settings()
    {
        $emailSetting = DB::table('settings')->where('key', 'contact_recipient_email')->first();
        $recipientEmail = $emailSetting ? $emailSetting->value : 'hello@itc.com';

        return view('noi-bo.settings', compact('recipientEmail'));
    }

    public function updateSettings(Request $request)
    {
        $request->validate([
            'current_code' => 'nullable|string',
            'new_code' => 'nullable|string|min:4|confirmed',
            'recipient_email' => 'required|email|max:255',
        ]);

        // 1. Update Recipient Email
        DB::table('settings')->updateOrInsert(
            ['key' => 'contact_recipient_email'],
            [
                'value' => $request->recipient_email,
                'updated_at' => now()
            ]
        );

        // 2. Update Access Code if provided
        if (!empty($request->new_code)) {
            if (empty($request->current_code)) {
                return back()->withErrors(['current_code' => 'Vui lòng cung cấp mã truy cập hiện tại để đổi mã mới.']);
            }

            $setting = DB::table('settings')->where('key', 'portal_access_code')->first();
            if (!$setting || !Hash::check($request->current_code, $setting->value)) {
                return back()->withErrors(['current_code' => 'Mã truy cập hiện tại không đúng.']);
            }

            DB::table('settings')
                ->where('key', 'portal_access_code')
                ->update(['value' => Hash::make($request->new_code)]);
        }

        return back()->with('success', 'Cập nhật cài đặt chung thành công.');
    }

    // Banner Management
    public function banner()
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

    public function updateBanner(Request $request)
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

    public function activateBanner(Request $request)
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

    public function deleteBanner(Request $request)
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
    public function apiBanner()
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

    // News Admin Management
    public function newsIndex()
    {
        $newsList = DB::table('news')->orderByDesc('id')->get();
        return view('noi-bo.news', compact('newsList'));
    }

    public function newsCreate()
    {
        return view('noi-bo.news-create');
    }

    public function newsStore(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'news_image' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
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
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect('/admin/news')->with('success', 'Đăng tin tức thành công!');
        }

        return back()->withErrors(['news_image' => 'Vui lòng tải lên ảnh đại diện tin tức.'])->withInput();
    }

    public function newsEdit($id)
    {
        $news = DB::table('news')->where('id', $id)->first();
        if (!$news) {
            abort(404, 'Bài viết không tồn tại.');
        }
        return view('noi-bo.news-edit', compact('news'));
    }

    public function newsUpdate(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'news_image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
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

        DB::table('news')->where('id', $id)->update([
            'title' => $request->title,
            'summary' => $request->summary,
            'content' => $request->content,
            'image_path' => $imagePath,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'updated_at' => now(),
        ]);

        return redirect('/admin/news')->with('success', 'Cập nhật bài viết thành công!');
    }

    public function newsToggleStatus(Request $request)
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

    public function newsDelete(Request $request)
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
    public function apiNewsIndex()
    {
        // Only return visible news for public client pages
        $newsList = DB::table('news')->where('is_visible', true)->orderByDesc('id')->get();
        return response()->json($newsList);
    }

    public function apiNewsDetail($id)
    {
        $news = DB::table('news')->where('id', $id)->first();
        if (!$news) {
            return response()->json(['message' => 'Tin tức không tồn tại.'], 404);
        }
        return response()->json($news);
    }

    public function apiContactStore(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'serviceField' => 'required|string|max:100',
            'message' => 'required|string',
        ]);

        // Fetch configured recipient email address
        $emailSetting = DB::table('settings')->where('key', 'contact_recipient_email')->first();
        $recipientEmail = $emailSetting ? $emailSetting->value : 'hello@itc.com';

        try {
            // Send email using Laravel Mail facility
            \Illuminate\Support\Facades\Mail::to($recipientEmail)->send(new \App\Mail\ContactRequestMail($request->all()));
            
            return response()->json([
                'success' => true,
                'message' => 'Yêu cầu tư vấn đã được gửi thành công!',
            ]);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Lỗi gửi email liên hệ: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Lỗi gửi yêu cầu tư vấn: ' . $e->getMessage(),
            ], 500);
        }
    }
}
