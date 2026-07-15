<?php

namespace App\Http\Controllers;

use App\Models\CharacterPoint;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class LeaderboardController extends Controller
{
    public function index(Request $request): Response
    {
        $school = $this->schoolRanking();
        $bySubject = $this->subjectRanking();

        return Inertia::render('Leaderboard/Index', [
            'schoolRanking' => $school,
            'subjectRanking' => $bySubject,
            'currentUserId' => $request->user()->id,
        ]);
    }

    /**
     * Top 1 sekolah — 100% dari akumulasi Poin Karakter (termasuk poin yang
     * dinilai guru maupun peer/aksi).
     */
    private function schoolRanking()
    {
        return User::query()
            ->where('role', 'siswa')
            ->orderByDesc('total_character_points')
            ->limit(20)
            ->get(['id', 'name', 'avatar_url', 'total_character_points'])
            ->map(fn (User $u, int $i) => [
                'rank' => $i + 1,
                'id' => $u->id,
                'name' => $u->name,
                'avatar_url' => $u->avatar_url,
                'points' => $u->total_character_points,
            ]);
    }

    /**
     * Top 1 per bidang (dimensi P5 / mata pelajaran) berdasarkan akumulasi
     * poin karakter yang tercatat pada dimensi tersebut.
     */
    private function subjectRanking()
    {
        return CharacterPoint::query()
            ->select('p5_dimension', 'user_id', DB::raw('SUM(points) as total'))
            ->whereNotNull('p5_dimension')
            ->groupBy('p5_dimension', 'user_id')
            ->orderByDesc('total')
            ->with('user:id,name,avatar_url')
            ->get()
            ->groupBy('p5_dimension')
            ->map(function ($rows, $dimension) {
                $leader = $rows->first();

                return [
                    'dimension' => $dimension,
                    'leader' => $leader->user?->name ?? '-',
                    'avatar_url' => $leader->user?->avatar_url,
                    'points' => (int) $leader->total,
                ];
            })
            ->values();
    }
}
