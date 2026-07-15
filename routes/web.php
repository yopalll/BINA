<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AksesibilitasController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BattleController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\GuruController;
use App\Http\Controllers\KaryaController;
use App\Http\Controllers\LeaderboardController;
use App\Http\Controllers\OfflineController;
use App\Http\Controllers\TtsController;
use Illuminate\Support\Facades\Route;

// ── Guest ──
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth')->name('logout');

// Text-to-Speech (available to any authenticated user).
Route::post('/tts', TtsController::class)->middleware('auth')->name('tts');

// ── Authenticated app ──
Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // Forum — Belajar Bareng
    Route::prefix('forum')->name('forum.')->group(function () {
        Route::get('/', [ForumController::class, 'index'])->name('index');
        Route::post('/', [ForumController::class, 'storeThread'])->name('threads.store');
        Route::get('/{thread}', [ForumController::class, 'show'])->name('show');
        Route::post('/{thread}/replies', [ForumController::class, 'storeReply'])->name('replies.store');
        Route::post('/replies/{reply}/react', [ForumController::class, 'react'])->name('replies.react');
    });

    // Karya-Ku
    Route::prefix('karya')->name('karya.')->group(function () {
        Route::get('/', [KaryaController::class, 'index'])->name('index');
        Route::post('/', [KaryaController::class, 'store'])->name('store');
        Route::post('/{karya}/react', [KaryaController::class, 'react'])->name('react');
        Route::post('/{karya}/approve', [KaryaController::class, 'approve'])->name('approve');
    });

    // Battle HOTS
    Route::prefix('battle')->name('battle.')->group(function () {
        Route::get('/', [BattleController::class, 'index'])->name('index');
        Route::get('/play', [BattleController::class, 'play'])->name('play');
        Route::post('/submit', [BattleController::class, 'submit'])->name('submit');
        Route::get('/result', [BattleController::class, 'result'])->name('result');
    });

    Route::get('/leaderboard', [LeaderboardController::class, 'index'])->name('leaderboard.index');

    // Dengar & Baca — Aksesibilitas
    Route::get('/aksesibilitas', [AksesibilitasController::class, 'index'])->name('aksesibilitas.index');
    Route::put('/aksesibilitas', [AksesibilitasController::class, 'update'])->name('aksesibilitas.update');

    Route::get('/offline', [OfflineController::class, 'index'])->name('offline.index');

    // Guru area
    Route::prefix('guru')->name('guru.')->middleware('role:guru,admin')->group(function () {
        Route::get('/dashboard', [GuruController::class, 'dashboard'])->name('dashboard');
        Route::get('/analitik', [GuruController::class, 'analytics'])->name('analytics');
        Route::post('/karya/{karya}/approve', [GuruController::class, 'approveKarya'])->name('karya.approve');
    });

    // Admin area
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    });
});
