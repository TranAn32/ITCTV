<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoiBoController;
use App\Http\Controllers\Admin\BannerController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\RecruitmentController;
use App\Http\Controllers\Api\ContactController;

// Public Website Routes - React SPA
// All public routes serve the same Blade view; the React app handles routing via History API
Route::get('/', function () { return view('public.home'); });
Route::get('/about', function () { return view('public.home'); });
Route::get('/services', function () { return view('public.home'); });
Route::get('/projects', function () { return view('public.home'); });
Route::get('/gallery', function () { return view('public.home'); });
Route::get('/clients', function () { return view('public.home'); });
Route::get('/news', function () { return view('public.home'); });
Route::get('/news/{id}', function () { return view('public.home'); })->where('id', '[0-9]+');
Route::get('/contact', function () { return view('public.home'); });
Route::get('/recruitment', function () { return view('public.home'); });

// Public API
Route::get('/api/banner', [BannerController::class, 'apiIndex']);
Route::get('/api/banner-image/{filename}', function ($filename) {
    $path = base_path('resources/react-app/assets/images-banner/' . $filename);
    if (!file_exists($path)) abort(404);
    return response()->file($path);
})->where('filename', '.*');

Route::get('/api/news', [NewsController::class, 'apiIndex']);
Route::get('/api/news/{id}', [NewsController::class, 'apiDetail']);
Route::get('/api/projects', [ProjectController::class, 'apiIndex']);
Route::get('/api/partners', [PartnerController::class, 'apiIndex']);
Route::get('/api/services', [ServiceController::class, 'apiIndex']);
Route::get('/api/gallery', [GalleryController::class, 'apiIndex']);
Route::get('/api/recruitments', [RecruitmentController::class, 'apiIndex']);
Route::post('/api/contact', [ContactController::class, 'store']);

// Admin Portal Routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [NoiBoController::class, 'login']);
    Route::post('/login', [NoiBoController::class, 'authenticate']);
    Route::post('/logout', [NoiBoController::class, 'logout']);

    Route::middleware([\App\Http\Middleware\NoiBoAuth::class])->group(function () {
        Route::get('/', [NoiBoController::class, 'index']);
        Route::get('/banner', [BannerController::class, 'index']);
        Route::post('/banner', [BannerController::class, 'update']);
        Route::post('/banner/activate', [BannerController::class, 'activate']);
        Route::post('/banner/delete', [BannerController::class, 'delete']);
        Route::get('/settings', [SettingsController::class, 'index']);
        Route::post('/settings', [SettingsController::class, 'update']);
        
        // News Management Routes
        Route::get('/news', [NewsController::class, 'index']);
        Route::get('/news/create', [NewsController::class, 'create']);
        Route::post('/news', [NewsController::class, 'store']);
        Route::get('/news/{id}/edit', [NewsController::class, 'edit']);
        Route::post('/news/{id}/edit', [NewsController::class, 'update']);
        Route::post('/news/toggle-status', [NewsController::class, 'toggleStatus']);
        Route::post('/news/delete', [NewsController::class, 'delete']);

        // Project Management Routes
        Route::get('/projects', [ProjectController::class, 'index']);
        Route::get('/projects/create', [ProjectController::class, 'create']);
        Route::post('/projects', [ProjectController::class, 'store']);
        Route::get('/projects/{id}/edit', [ProjectController::class, 'edit']);
        Route::post('/projects/{id}/edit', [ProjectController::class, 'update']);
        Route::post('/projects/toggle-status', [ProjectController::class, 'toggleStatus']);
        Route::post('/projects/delete', [ProjectController::class, 'delete']);

        // Partner Management Routes
        Route::get('/partners', [PartnerController::class, 'index']);
        Route::get('/partners/create', [PartnerController::class, 'create']);
        Route::post('/partners', [PartnerController::class, 'store']);
        Route::get('/partners/{id}/edit', [PartnerController::class, 'edit']);
        Route::post('/partners/{id}/edit', [PartnerController::class, 'update']);
        Route::post('/partners/toggle-status', [PartnerController::class, 'toggleStatus']);
        Route::post('/partners/update-order', [PartnerController::class, 'updateOrder']);
        Route::post('/partners/delete', [PartnerController::class, 'delete']);

        // Service Management Routes
        Route::get('/services', [ServiceController::class, 'index']);
        Route::get('/services/create', [ServiceController::class, 'create']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::get('/services/{id}/edit', [ServiceController::class, 'edit']);
        Route::post('/services/{id}/edit', [ServiceController::class, 'update']);
        Route::post('/services/toggle-status', [ServiceController::class, 'toggleStatus']);
        Route::post('/services/delete', [ServiceController::class, 'delete']);

        // Gallery Management Routes
        Route::get('/gallery', [GalleryController::class, 'index']);
        Route::get('/gallery/create', [GalleryController::class, 'create']);
        Route::post('/gallery', [GalleryController::class, 'store']);
        Route::get('/gallery/{id}/edit', [GalleryController::class, 'edit']);
        Route::post('/gallery/{id}/edit', [GalleryController::class, 'update']);
        Route::post('/gallery/toggle-status', [GalleryController::class, 'toggleStatus']);
        Route::post('/gallery/delete', [GalleryController::class, 'delete']);

        // Recruitment Management Routes
        Route::get('/recruitments', [RecruitmentController::class, 'index']);
        Route::get('/recruitments/create', [RecruitmentController::class, 'create']);
        Route::post('/recruitments', [RecruitmentController::class, 'store']);
        Route::get('/recruitments/{id}/edit', [RecruitmentController::class, 'edit']);
        Route::post('/recruitments/{id}/edit', [RecruitmentController::class, 'update']);
        Route::post('/recruitments/toggle-status', [RecruitmentController::class, 'toggleStatus']);
        Route::post('/recruitments/delete', [RecruitmentController::class, 'delete']);
    });
});
