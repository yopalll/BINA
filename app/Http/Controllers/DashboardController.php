<?php

namespace App\Http\Controllers;

use App\Models\CharacterPoint;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $approvedKarya = $user->karyas()->where('status', 'approved')->count();
        $battleWins = $user->challengedMatches()->where('winner_id', $user->id)->count()
            + $user->opponentMatches()->where('winner_id', $user->id)->count();
        $badgeCount = $user->badges()->count();

        $weeklyPoints = $user->characterPoints()
            ->where('created_at', '>=', now()->subWeek())
            ->sum('points');

        $recent = $user->characterPoints()
            ->latest()
            ->limit(5)
            ->get()
            ->map(fn (CharacterPoint $p) => [
                'icon' => $this->sourceIcon($p->source_type),
                'text' => $p->description ?: "Poin dari {$p->source_type}",
                'time' => $p->created_at->diffForHumans(),
                'points' => $p->points,
            ]);

        return Inertia::render('Dashboard', [
            'stats' => [
                'character_points' => $user->total_character_points,
                'approved_karya' => $approvedKarya,
                'battle_wins' => $battleWins,
                'badges' => $badgeCount,
            ],
            'weeklyPoints' => (int) $weeklyPoints,
            'recentActivities' => $recent,
        ]);
    }

    private function sourceIcon(string $type): string
    {
        return match ($type) {
            'karya' => '✅',
            'battle' => '⚔️',
            'forum' => '💬',
            'teacher_assessment' => '🏅',
            default => '⭐',
        };
    }
}
