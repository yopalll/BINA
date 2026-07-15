<?php

namespace App\Http\Controllers;

use App\Services\SpeechService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class TtsController extends Controller
{
    public function __invoke(Request $request, SpeechService $speech): Response
    {
        $data = $request->validate([
            'text' => ['required', 'string', 'max:2000'],
            'voice' => ['nullable', 'string'],
        ]);

        // When Azure is not configured, tell the client to use the browser's
        // built-in Web Speech API instead (HTTP 204 = no server audio).
        if (! $speech->isConfigured()) {
            return response()->noContent(); // 204
        }

        $cacheKey = 'tts:'.md5($data['text'].($data['voice'] ?? ''));
        $audio = Cache::remember($cacheKey, now()->addDay(), fn () => $speech->synthesize($data['text'], $data['voice'] ?? null));

        if ($audio === null) {
            return response()->noContent();
        }

        return response($audio, 200, [
            'Content-Type' => 'audio/mpeg',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}
