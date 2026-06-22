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

    // Project Admin Management
    public function projectsIndex()
    {
        $projectsList = DB::table('projects')->orderByDesc('id')->get();
        return view('noi-bo.projects', compact('projectsList'));
    }

    public function projectsCreate()
    {
        return view('noi-bo.projects-create');
    }

    public function projectsStore(Request $request)
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

    public function projectsEdit($id)
    {
        $project = DB::table('projects')->where('id', $id)->first();
        if (!$project) {
            abort(404, 'Dự án không tồn tại.');
        }
        return view('noi-bo.projects-edit', compact('project'));
    }

    public function projectsUpdate(Request $request, $id)
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

    public function projectsToggleStatus(Request $request)
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

    public function projectsDelete(Request $request)
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

    public function apiProjectsIndex()
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

    // Partner Admin Management
    public function partnersIndex()
    {
        $partnersList = DB::table('partners')->orderByDesc('id')->get();
        return view('noi-bo.partners', compact('partnersList'));
    }

    public function partnersCreate()
    {
        return view('noi-bo.partners-create');
    }

    public function partnersStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|string|max:100',
            'partner_logo' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
        ]);

        if ($request->hasFile('partner_logo')) {
            $file = $request->file('partner_logo');
            $filename = 'partner-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            
            $uploadPath = public_path('upload/Partners');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }

            $file->move($uploadPath, $filename);
            $logoPath = '/upload/Partners/' . $filename;

            DB::table('partners')->insert([
                'name' => $request->name,
                'group' => $request->group,
                'logo_path' => $logoPath,
                'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect('/admin/partners')->with('success', 'Thêm đối tác thành công!');
        }

        return back()->withErrors(['partner_logo' => 'Vui lòng tải lên logo đối tác.'])->withInput();
    }

    public function partnersEdit($id)
    {
        $partner = DB::table('partners')->where('id', $id)->first();
        if (!$partner) {
            abort(404, 'Đối tác không tồn tại.');
        }
        return view('noi-bo.partners-edit', compact('partner'));
    }

    public function partnersUpdate(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|string|max:100',
            'partner_logo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
            'is_visible' => 'nullable|in:0,1',
        ]);

        $partner = DB::table('partners')->where('id', $id)->first();
        if (!$partner) {
            return redirect('/admin/partners')->withErrors(['error' => 'Đối tác không tồn tại.']);
        }

        $logoPath = $partner->logo_path;

        if ($request->hasFile('partner_logo')) {
            // Delete old file
            $oldFilepath = public_path($partner->logo_path);
            if (file_exists($oldFilepath) && is_file($oldFilepath)) {
                unlink($oldFilepath);
            }

            // Upload new file
            $file = $request->file('partner_logo');
            $filename = 'partner-' . time() . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
            $uploadPath = public_path('upload/Partners');
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0755, true);
            }
            $file->move($uploadPath, $filename);
            $logoPath = '/upload/Partners/' . $filename;
        }

        DB::table('partners')->where('id', $id)->update([
            'name' => $request->name,
            'group' => $request->group,
            'logo_path' => $logoPath,
            'is_visible' => $request->has('is_visible') ? (bool)$request->is_visible : true,
            'updated_at' => now(),
        ]);

        return redirect('/admin/partners')->with('success', 'Cập nhật đối tác thành công!');
    }

    public function partnersToggleStatus(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $partner = DB::table('partners')->where('id', $request->id)->first();
        if ($partner) {
            $newStatus = !$partner->is_visible;
            DB::table('partners')->where('id', $request->id)->update([
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
            'message' => 'Đối tác không tồn tại.',
        ], 404);
    }

    public function partnersDelete(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $partner = DB::table('partners')->where('id', $request->id)->first();
        if ($partner) {
            $filepath = public_path($partner->logo_path);
            if (file_exists($filepath) && is_file($filepath)) {
                unlink($filepath);
            }
            DB::table('partners')->where('id', $request->id)->delete();
            return redirect('/admin/partners')->with('success', 'Đã xóa đối tác thành công!');
        }

        return redirect('/admin/partners')->withErrors(['error' => 'Không tìm thấy đối tác để xóa.']);
    }

    public function apiPartnersIndex()
    {
        $partnersList = DB::table('partners')->where('is_visible', true)->orderByDesc('id')->get();
        
        $mappedPartners = $partnersList->map(function ($partner) {
            return [
                'name' => $partner->name,
                'group' => $partner->group,
                'logo' => $partner->logo_path,
            ];
        });

        return response()->json($mappedPartners);
    }

    // Service Admin Management
    public function servicesIndex()
    {
        $servicesList = DB::table('services')->orderBy('sort_order')->orderBy('id')->get();
        return view('noi-bo.services', compact('servicesList'));
    }

    public function servicesCreate()
    {
        return view('noi-bo.services-create');
    }

    public function servicesStore(Request $request)
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

    public function servicesEdit($id)
    {
        $service = DB::table('services')->where('id', $id)->first();
        if (!$service) {
            abort(404, 'Dịch vụ không tồn tại.');
        }
        return view('noi-bo.services-edit', compact('service'));
    }

    public function servicesUpdate(Request $request, $id)
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

    public function servicesToggleStatus(Request $request)
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

    public function servicesDelete(Request $request)
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

    public function apiServicesIndex()
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

    // Gallery Admin Management
    public function galleryIndex()
    {
        $galleryList = DB::table('gallery_images')->orderBy('sort_order')->orderByDesc('id')->get();
        return view('noi-bo.gallery', compact('galleryList'));
    }

    public function galleryCreate()
    {
        return view('noi-bo.gallery-create');
    }

    public function galleryStore(Request $request)
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

    public function galleryEdit($id)
    {
        $galleryImage = DB::table('gallery_images')->where('id', $id)->first();
        if (!$galleryImage) {
            abort(404, 'Hình ảnh không tồn tại.');
        }
        return view('noi-bo.gallery-edit', compact('galleryImage'));
    }

    public function galleryUpdate(Request $request, $id)
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

    public function galleryToggleStatus(Request $request)
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

    public function galleryDelete(Request $request)
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

    public function apiGalleryIndex()
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
