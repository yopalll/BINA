<?php

namespace App\Http\Controllers;

use App\Models\CharacterPoint;
use App\Models\Karya;
use App\Models\KaryaReaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class KaryaController extends Controller
{
    public function index(Request $request): Response
    {
        $works = Karya::query()
            ->with('user:id,name')
            ->withCount('reactions')
            ->where('status', 'approved')
            ->latest()
            ->get()
            ->map(fn (Karya $k) => [
                'id' => $k->id,
                'title' => $k->title,
                'description' => $k->description,
                'type' => $k->type,
                'media_url' => $k->media_url,
                'content' => $k->content,
                'author' => $k->user->name,
                'points' => $k->character_points,
                'reactions' => $k->reactions_count,
                'time' => $k->created_at->diffForHumans(),
            ]);

        return Inertia::render('Karya/Index', [
            'works' => $works,
            'myPending' => $request->user()->karyas()->where('status', 'pending')->count(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:2000'],
            'type' => ['required', 'in:tulisan,gambar,aksi,prakarya,puisi,video'],
            'content' => ['nullable', 'string'],
            'media' => ['nullable', 'file', 'max:20480', 'mimes:jpg,jpeg,png,gif,webp,mp4,webm'],
        ]);

        $mediaUrl = null;
        if ($request->hasFile('media')) {
            // Prefer Cloudflare R2 when configured; fall back to the public disk.
            $disk = config('filesystems.default') === 'r2' && filled(config('filesystems.disks.r2.key'))
                ? 'r2'
                : 'public';

            $path = $request->file('media')->store('karya', $disk);
            $mediaUrl = Storage::disk($disk)->url($path);
        }

        $request->user()->karyas()->create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'type' => $data['type'],
            'content' => $data['content'] ?? null,
            'media_url' => $mediaUrl,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Karya terkirim! Menunggu validasi teman/guru.');
    }

    public function react(Request $request, Karya $karya): RedirectResponse
    {
        $data = $request->validate([
            'emoji' => ['required', 'in:👍,❤️,🎉'],
        ]);

        KaryaReaction::firstOrCreate([
            'karya_id' => $karya->id,
            'user_id' => $request->user()->id,
            'emoji' => $data['emoji'],
        ]);

        return back();
    }

    /**
     * Peer / teacher validation. When enough approvals accrue, the karya is
     * approved and Character Points are awarded.
     */
    public function approve(Request $request, Karya $karya): RedirectResponse
    {
        $user = $request->user();

        DB::transaction(function () use ($karya, $user) {
            $isTeacher = $user->isGuru() || $user->isAdmin();

            if ($isTeacher) {
                $karya->update([
                    'status' => 'approved',
                    'approved_by' => $user->id,
                    'character_points' => $karya->character_points ?: 50,
                ]);
            } else {
                $karya->increment('peer_approvals');
                if ($karya->peer_approvals >= $karya->required_approvals) {
                    $karya->update(['status' => 'approved', 'character_points' => 30]);
                }
            }

            if ($karya->fresh()->status === 'approved') {
                CharacterPoint::create([
                    'user_id' => $karya->user_id,
                    'points' => $karya->character_points,
                    'source_type' => 'karya',
                    'source_id' => $karya->id,
                    'p5_dimension' => 'Kreatif',
                    'description' => "Karya \"{$karya->title}\" disetujui",
                    'awarded_by' => $isTeacher ? $user->id : null,
                ]);
                $karya->user->increment('total_character_points', $karya->character_points);
            }
        });

        return back()->with('success', 'Validasi tersimpan. Terima kasih sudah mengapresiasi!');
    }
}
