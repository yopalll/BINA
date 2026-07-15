<?php

namespace App\Http\Controllers;

use App\Models\CharacterPoint;
use App\Models\ForumReply;
use App\Models\Karya;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class GuruController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $students = User::where('role', 'siswa')->count();
        $pendingKarya = Karya::where('status', 'pending')->count();
        $flaggedReplies = ForumReply::where('is_moderated', true)->count();

        return Inertia::render('Guru/Dashboard', [
            'stats' => [
                'students' => $students,
                'pending_karya' => $pendingKarya,
                'flagged' => $flaggedReplies,
            ],
            'pendingKarya' => Karya::with('user:id,name')
                ->where('status', 'pending')
                ->latest()
                ->limit(10)
                ->get()
                ->map(fn (Karya $k) => [
                    'id' => $k->id,
                    'title' => $k->title,
                    'author' => $k->user->name,
                    'type' => $k->type,
                ]),
        ]);
    }

    /**
     * AI Generate Dashboard (Notebook LLM): P5 character analytics.
     */
    public function analytics(Request $request): Response
    {
        // Aggregate character points by P5 dimension across all students.
        $byDimension = CharacterPoint::query()
            ->select('p5_dimension', DB::raw('SUM(points) as total'), DB::raw('COUNT(DISTINCT user_id) as students'))
            ->whereNotNull('p5_dimension')
            ->groupBy('p5_dimension')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => [
                'dimension' => $row->p5_dimension,
                'total' => (int) $row->total,
                'students' => (int) $row->students,
            ]);

        $topStudents = User::where('role', 'siswa')
            ->orderByDesc('total_character_points')
            ->limit(5)
            ->get(['id', 'name', 'total_character_points'])
            ->map(fn (User $u) => [
                'name' => $u->name,
                'points' => $u->total_character_points,
            ]);

        return Inertia::render('Guru/Analytics', [
            'byDimension' => $byDimension,
            'topStudents' => $topStudents,
            'aiConfigured' => app(\App\Services\LlamaService::class)->isConfigured(),
        ]);
    }

    public function approveKarya(Request $request, Karya $karya): RedirectResponse
    {
        return app(KaryaController::class)->approve($request, $karya);
    }
}
