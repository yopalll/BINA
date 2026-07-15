<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Microsoft Azure AI Speech text-to-speech (voice: id-ID-GadisNeural).
 *
 * When no key is configured, callers should fall back to the browser's
 * built-in Web Speech API on the client. This service signals that via
 * isConfigured() and returns null from synthesize().
 */
class SpeechService
{
    public function isConfigured(): bool
    {
        return filled(config('services.azure_speech.key'))
            && filled(config('services.azure_speech.region'));
    }

    /**
     * Synthesize speech and return raw MP3 bytes, or null when unavailable.
     */
    public function synthesize(string $text, ?string $voice = null): ?string
    {
        if (! $this->isConfigured()) {
            return null;
        }

        $voice = $voice ?: config('services.azure_speech.voice');
        $region = config('services.azure_speech.region');
        $endpoint = "https://{$region}.tts.speech.microsoft.com/cognitiveservices/v1";

        $ssml = $this->buildSsml($text, $voice);

        try {
            $response = Http::withHeaders([
                'Ocp-Apim-Subscription-Key' => config('services.azure_speech.key'),
                'Content-Type' => 'application/ssml+xml',
                'X-Microsoft-OutputFormat' => 'audio-24khz-48kbitrate-mono-mp3',
                'User-Agent' => 'BINA',
            ])->timeout(20)->withBody($ssml, 'application/ssml+xml')->post($endpoint);

            if ($response->failed()) {
                Log::warning('Azure TTS request failed', ['status' => $response->status()]);

                return null;
            }

            return $response->body();
        } catch (\Throwable $e) {
            Log::error('Azure TTS error', ['message' => $e->getMessage()]);

            return null;
        }
    }

    private function buildSsml(string $text, string $voice): string
    {
        $escaped = htmlspecialchars($text, ENT_XML1 | ENT_QUOTES, 'UTF-8');

        return <<<XML
        <speak version="1.0" xml:lang="id-ID">
            <voice xml:lang="id-ID" name="{$voice}">{$escaped}</voice>
        </speak>
        XML;
    }
}
