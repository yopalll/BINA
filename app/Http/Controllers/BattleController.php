<?php

namespace App\Http\Controllers;

use App\Models\BattleQuestion;
use App\Models\CharacterPoint;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BattleController extends Controller
{
    public function index(Request $request): Response
    {
        $opponents = User::query()
            ->where('role', 'siswa')
            ->where('id', '!=', $request->user()->id)
            ->inRandomOrder()
            ->limit(6)
            ->get(['id', 'name', 'avatar_url', 'total_character_points'])
            ->map(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'avatar_url' => $u->avatar_url,
                'points' => $u->total_character_points,
            ]);

        return Inertia::render('Battle/Index', [
            'opponents' => $opponents,
        ]);
    }

    public function play(Request $request): Response
    {
        $questions = BattleQuestion::query()
            ->inRandomOrder()
            ->limit(5)
            ->get()
            ->map(fn (BattleQuestion $q) => [
                'id' => $q->id,
                'subject' => $q->subject,
                'scenario' => $q->scenario,
                'question' => $q->question,
                'options' => $q->options,
                'time_per_question' => 30,
            ]);

        return Inertia::render('Battle/Play', [
            'questions' => $questions,
            'opponent' => [
                'name' => $request->query('opponent', 'Lawan Acak'),
            ],
        ]);
    }

    /**
     * Validate answers, compute score, award points, and return the result.
     */
    public function submit(Request $request): JsonResponse
    {
        $data = $request->validate([
            'answers' => ['required', 'array'],
            'answers.*.question_id' => ['required', 'exists:battle_questions,id'],
            'answers.*.option_id' => ['nullable', 'string'],
        ]);

        $questionIds = collect($data['answers'])->pluck('question_id');
        $questions = BattleQuestion::whereIn('id', $questionIds)->get()->keyBy('id');

        $correct = 0;
        $review = [];
        foreach ($data['answers'] as $answer) {
            $q = $questions[$answer['question_id']];
            $isCorrect = $q->correct_option_id === ($answer['option_id'] ?? null);
            $correct += $isCorrect ? 1 : 0;
            $review[] = [
                'question' => $q->question,
                'scenario' => $q->scenario,
                'your_answer' => $answer['option_id'] ?? null,
                'correct_option_id' => $q->correct_option_id,
                'is_correct' => $isCorrect,
                'explanation' => $q->explanation,
                'options' => $q->options,
            ];
        }

        $total = count($data['answers']);
        $win = $total > 0 && $correct / $total >= 0.6;
        $points = $correct * 10;

        if ($points > 0) {
            CharacterPoint::create([
                'user_id' => $request->user()->id,
                'points' => $points,
                'source_type' => 'battle',
                'p5_dimension' => 'Bernalar Kritis',
                'description' => "Battle HOTS: {$correct}/{$total} benar",
            ]);
            $request->user()->increment('total_character_points', $points);
        }

        return response()->json([
            'win' => $win,
            'correct' => $correct,
            'total' => $total,
            'points' => $points,
            'review' => $review,
        ]);
    }

    public function result(Request $request): Response
    {
        return Inertia::render('Battle/Result', [
            'win' => $request->boolean('win', true),
        ]);
    }
}
