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

// Internal Portal Routes
Route::prefix('noi-bo')->group(function () {
    Route::get('/login', [NoiBoController::class, 'login']);
    Route::post('/login', [NoiBoController::class, 'authenticate']);
    Route::post('/logout', [NoiBoController::class, 'logout']);

    Route::middleware([\App\Http\Middleware\NoiBoAuth::class])->group(function () {
        Route::get('/', [NoiBoController::class, 'index']);
        Route::get('/van-ban', [NoiBoController::class, 'vanBan']);
        Route::get('/sinh-so', [NoiBoController::class, 'sinhSo']);
        Route::get('/access-code', [NoiBoController::class, 'accessCode']);
        Route::post('/access-code', [NoiBoController::class, 'updateAccessCode']);
    });
});
