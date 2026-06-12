<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NoiBoController;

// Public Website Routes - React SPA
Route::get('/', function () { return view('public.home'); });
Route::get('/about', function () { return redirect('/'); });
Route::get('/services', function () { return redirect('/'); });
Route::get('/projects', function () { return redirect('/'); });
Route::get('/clients', function () { return redirect('/'); });
Route::get('/contact', function () { return redirect('/'); });

// Public API
Route::get('/api/banner', [NoiBoController::class, 'apiBanner']);
Route::get('/api/banner-image/{filename}', function ($filename) {
    $path = base_path('resources/react-app/assets/images-banner/' . $filename);
    if (!file_exists($path)) abort(404);
    return response()->file($path);
})->where('filename', '.*');

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
        Route::get('/access-code', [NoiBoController::class, 'accessCode']);
        Route::post('/access-code', [NoiBoController::class, 'updateAccessCode']);
    });
});
