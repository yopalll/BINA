<?php

namespace App\Http\Controllers;

use App\Models\ForumThread;
use App\Models\Karya;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function dashboard(Request $request): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'schools' => School::count(),
                'students' => User::where('role', 'siswa')->count(),
                'teachers' => User::where('role', 'guru')->count(),
                'threads' => ForumThread::count(),
                'karya' => Karya::count(),
            ],
            'schools' => School::withCount('users')
                ->get()
                ->map(fn (School $s) => [
                    'id' => $s->id,
                    'name' => $s->name,
                    'city' => $s->city,
                    'users' => $s->users_count,
                    'is_active' => $s->is_active,
                ]),
            'recentUsers' => User::with('school:id,name')
                ->latest()
                ->limit(8)
                ->get()
                ->map(fn (User $u) => [
                    'id' => $u->id,
                    'name' => $u->name,
                    'role' => $u->role,
                    'school' => $u->school?->name,
                ]),
        ]);
    }
}
