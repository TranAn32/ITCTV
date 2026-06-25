<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoiBoController;

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

// Public API
Route::get('/api/banner', [NoiBoController::class, 'apiBanner']);
Route::get('/api/banner-image/{filename}', function ($filename) {
    $path = base_path('resources/react-app/assets/images-banner/' . $filename);
    if (!file_exists($path)) abort(404);
    return response()->file($path);
})->where('filename', '.*');

Route::get('/api/news', [NoiBoController::class, 'apiNewsIndex']);
Route::get('/api/news/{id}', [NoiBoController::class, 'apiNewsDetail']);
Route::get('/api/projects', [NoiBoController::class, 'apiProjectsIndex']);
Route::get('/api/partners', [NoiBoController::class, 'apiPartnersIndex']);
Route::get('/api/services', [NoiBoController::class, 'apiServicesIndex']);
Route::get('/api/gallery', [NoiBoController::class, 'apiGalleryIndex']);
Route::post('/api/contact', [NoiBoController::class, 'apiContactStore']);

// Admin Portal Routes
Route::prefix('admin')->group(function () {
    Route::get('/login', [NoiBoController::class, 'login']);
    Route::post('/login', [NoiBoController::class, 'authenticate']);
    Route::post('/logout', [NoiBoController::class, 'logout']);

    Route::middleware([\App\Http\Middleware\NoiBoAuth::class])->group(function () {
        Route::get('/', [NoiBoController::class, 'index']);
        Route::get('/banner', [NoiBoController::class, 'banner']);
        Route::post('/banner', [NoiBoController::class, 'updateBanner']);
        Route::post('/banner/activate', [NoiBoController::class, 'activateBanner']);
        Route::post('/banner/delete', [NoiBoController::class, 'deleteBanner']);
        Route::get('/settings', [NoiBoController::class, 'settings']);
        Route::post('/settings', [NoiBoController::class, 'updateSettings']);
        
        // News Management Routes
        Route::get('/news', [NoiBoController::class, 'newsIndex']);
        Route::get('/news/create', [NoiBoController::class, 'newsCreate']);
        Route::post('/news', [NoiBoController::class, 'newsStore']);
        Route::get('/news/{id}/edit', [NoiBoController::class, 'newsEdit']);
        Route::post('/news/{id}/edit', [NoiBoController::class, 'newsUpdate']);
        Route::post('/news/toggle-status', [NoiBoController::class, 'newsToggleStatus']);
        Route::post('/news/delete', [NoiBoController::class, 'newsDelete']);

        // Project Management Routes
        Route::get('/projects', [NoiBoController::class, 'projectsIndex']);
        Route::get('/projects/create', [NoiBoController::class, 'projectsCreate']);
        Route::post('/projects', [NoiBoController::class, 'projectsStore']);
        Route::get('/projects/{id}/edit', [NoiBoController::class, 'projectsEdit']);
        Route::post('/projects/{id}/edit', [NoiBoController::class, 'projectsUpdate']);
        Route::post('/projects/toggle-status', [NoiBoController::class, 'projectsToggleStatus']);
        Route::post('/projects/delete', [NoiBoController::class, 'projectsDelete']);

        // Partner Management Routes
        Route::get('/partners', [NoiBoController::class, 'partnersIndex']);
        Route::get('/partners/create', [NoiBoController::class, 'partnersCreate']);
        Route::post('/partners', [NoiBoController::class, 'partnersStore']);
        Route::get('/partners/{id}/edit', [NoiBoController::class, 'partnersEdit']);
        Route::post('/partners/{id}/edit', [NoiBoController::class, 'partnersUpdate']);
        Route::post('/partners/toggle-status', [NoiBoController::class, 'partnersToggleStatus']);
        Route::post('/partners/delete', [NoiBoController::class, 'partnersDelete']);

        // Service Management Routes
        Route::get('/services', [NoiBoController::class, 'servicesIndex']);
        Route::get('/services/create', [NoiBoController::class, 'servicesCreate']);
        Route::post('/services', [NoiBoController::class, 'servicesStore']);
        Route::get('/services/{id}/edit', [NoiBoController::class, 'servicesEdit']);
        Route::post('/services/{id}/edit', [NoiBoController::class, 'servicesUpdate']);
        Route::post('/services/toggle-status', [NoiBoController::class, 'servicesToggleStatus']);
        Route::post('/services/delete', [NoiBoController::class, 'servicesDelete']);

        // Gallery Management Routes
        Route::get('/gallery', [NoiBoController::class, 'galleryIndex']);
        Route::get('/gallery/create', [NoiBoController::class, 'galleryCreate']);
        Route::post('/gallery', [NoiBoController::class, 'galleryStore']);
        Route::get('/gallery/{id}/edit', [NoiBoController::class, 'galleryEdit']);
        Route::post('/gallery/{id}/edit', [NoiBoController::class, 'galleryUpdate']);
        Route::post('/gallery/toggle-status', [NoiBoController::class, 'galleryToggleStatus']);
        Route::post('/gallery/delete', [NoiBoController::class, 'galleryDelete']);
    });
});
