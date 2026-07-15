<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Wrapper for Meta-Llama-3.1-8B-Instruct inference (OpenAI-compatible endpoint,
 * e.g. Groq). Powers second-layer content moderation for the forum.
 *
 * When no API key is configured, every method degrades gracefully to a
 * heuristic fallback so the app remains fully functional offline / in demo.
 */
class LlamaService
{
    public function isConfigured(): bool
    {
        return filled(config('services.llama.api_key'));
    }

    /**
     * Analyse a piece of user text for aggression / bullying / passive hostility.
     *
     * @return array{flagged: bool, severity: string, reason: string, source: string}
     */
    public function moderate(string $text): array
    {
        if (! $this->isConfigured()) {
            return $this->heuristicModeration($text);
        }

        try {
            $response = Http::withToken(config('services.llama.api_key'))
                ->timeout(15)
                ->baseUrl(rtrim(config('services.llama.base_url'), '/'))
                ->post('/chat/completions', [
                    'model' => config('services.llama.model'),
                    'temperature' => 0,
                    'response_format' => ['type' => 'json_object'],
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => $this->moderationSystemPrompt(),
                        ],
                        [
                            'role' => 'user',
                            'content' => $text,
                        ],
                    ],
                ]);

            if ($response->failed()) {
                Log::warning('Llama moderation request failed', ['status' => $response->status()]);

                return $this->heuristicModeration($text);
            }

            $content = data_get($response->json(), 'choices.0.message.content');
            $parsed = json_decode((string) $content, true);

            if (! is_array($parsed) || ! array_key_exists('flagged', $parsed)) {
                return $this->heuristicModeration($text);
            }

            return [
                'flagged' => (bool) $parsed['flagged'],
                'severity' => (string) ($parsed['severity'] ?? 'low'),
                'reason' => (string) ($parsed['reason'] ?? ''),
                'source' => 'llama',
            ];
        } catch (\Throwable $e) {
            Log::error('Llama moderation error', ['message' => $e->getMessage()]);

            return $this->heuristicModeration($text);
        }
    }

    private function moderationSystemPrompt(): string
    {
        return <<<'PROMPT'
        Kamu adalah moderator forum belajar anak Indonesia. Analisis pesan siswa untuk
        indikasi perundungan (bullying), agresi pasif, ujaran kebencian, atau intimidasi.
        Balas HANYA dalam JSON dengan bentuk:
        {"flagged": boolean, "severity": "low"|"medium"|"high", "reason": "penjelasan singkat Bahasa Indonesia"}
        Tandai flagged=true hanya bila ada indikasi nyata perilaku negatif terhadap orang lain.
        Kritik ide/materi pelajaran yang sopan TIDAK dianggap pelanggaran.
        PROMPT;
    }

    /**
     * Non-AI fallback: lightweight keyword + pattern heuristic.
     *
     * @return array{flagged: bool, severity: string, reason: string, source: string}
     */
    private function heuristicModeration(string $text): array
    {
        $normalized = mb_strtolower($text);

        $aggressive = [
            'bodoh', 'goblok', 'tolol', 'bego', 'idiot', 'dungu', 'sampah',
            'bacot', 'diam kamu', 'diam lu', 'gak berguna', 'tidak berguna',
            'jelek banget', 'payah', 'cupu', 'noob', 'mati aja', 'pergi sana',
        ];

        foreach ($aggressive as $needle) {
            if (str_contains($normalized, $needle)) {
                return [
                    'flagged' => true,
                    'severity' => 'medium',
                    'reason' => "Terindikasi kata/nada merendahkan: \"{$needle}\".",
                    'source' => 'heuristic',
                ];
            }
        }

        return [
            'flagged' => false,
            'severity' => 'low',
            'reason' => '',
            'source' => 'heuristic',
        ];
    }
}
