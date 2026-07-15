<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Dashboard'))->name('dashboard');

Route::get('/login', fn () => Inertia::render('Auth/Login'))->name('login');

Route::prefix('forum')->name('forum.')->group(function () {
    Route::get('/', fn () => Inertia::render('Forum/Index'))->name('index');
    Route::get('/{thread}', fn ($thread) => Inertia::render('Forum/Show', ['thread' => $thread]))->name('show');
});

Route::get('/karya', fn () => Inertia::render('Karya/Index'))->name('karya.index');

Route::prefix('battle')->name('battle.')->group(function () {
    Route::get('/', fn () => Inertia::render('Battle/Index'))->name('index');
    Route::get('/play', fn () => Inertia::render('Battle/Play'))->name('play');
    Route::get('/result', fn () => Inertia::render('Battle/Result'))->name('result');
});

Route::get('/leaderboard', fn () => Inertia::render('Leaderboard/Index'))->name('leaderboard.index');

Route::get('/aksesibilitas', fn () => Inertia::render('Aksesibilitas/Index'))->name('aksesibilitas.index');

Route::get('/offline', fn () => Inertia::render('Offline/Index'))->name('offline.index');

Route::prefix('guru')->name('guru.')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Guru/Dashboard'))->name('dashboard');
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Admin/Dashboard'))->name('dashboard');
});
