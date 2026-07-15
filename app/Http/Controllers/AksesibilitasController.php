<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AksesibilitasController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Aksesibilitas/Index', [
            'preferences' => $request->user()->accessibility_preferences ?? $this->defaults(),
            'ttsLive' => app(\App\Services\SpeechService::class)->isConfigured(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'high_contrast' => ['boolean'],
            'font_scale' => ['numeric', 'min:0.8', 'max:1.6'],
            'speech_rate' => ['numeric', 'min:0.5', 'max:2'],
            'voice' => ['string', 'in:perempuan,laki-laki'],
        ]);

        $request->user()->update([
            'accessibility_preferences' => [...$this->defaults(), ...$data],
        ]);

        return back()->with('success', 'Pengaturan aksesibilitas tersimpan.');
    }

    private function defaults(): array
    {
        return [
            'high_contrast' => false,
            'font_scale' => 1.0,
            'speech_rate' => 1.0,
            'voice' => 'perempuan',
        ];
    }
}
