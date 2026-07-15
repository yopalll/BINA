<?php

namespace Tests\Feature;

use App\Jobs\ModerateForumReply;
use App\Models\BattleQuestion;
use App\Models\ForumCategory;
use App\Models\ForumReply;
use App\Models\ForumThread;
use App\Models\User;
use App\Services\LlamaService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SmokeTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    public function test_guests_are_redirected_to_login(): void
    {
        $this->get('/')->assertRedirect('/login');
    }

    public function test_student_can_log_in(): void
    {
        $this->post('/login', ['email' => 'siswa@bina.id', 'password' => 'password'])
            ->assertRedirect('/');
        $this->assertAuthenticated();
    }

    public function test_wrong_credentials_are_rejected(): void
    {
        $this->post('/login', ['email' => 'siswa@bina.id', 'password' => 'salah'])
            ->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_all_student_pages_render(): void
    {
        $user = User::where('email', 'siswa@bina.id')->first();
        $thread = ForumThread::first();

        $routes = ['/', '/forum', "/forum/{$thread->id}", '/karya', '/battle', '/battle/play', '/battle/result', '/leaderboard', '/aksesibilitas', '/offline'];

        foreach ($routes as $route) {
            $this->actingAs($user)->get($route)->assertOk();
        }
    }

    public function test_guru_and_admin_dashboards_render(): void
    {
        $guru = User::where('email', 'guru@bina.id')->first();
        $admin = User::where('email', 'admin@bina.id')->first();

        $this->actingAs($guru)->get('/guru/dashboard')->assertOk();
        $this->actingAs($guru)->get('/guru/analitik')->assertOk();
        $this->actingAs($admin)->get('/admin/dashboard')->assertOk();
    }

    public function test_students_cannot_access_guru_or_admin_areas(): void
    {
        $siswa = User::where('email', 'siswa@bina.id')->first();

        $this->actingAs($siswa)->get('/guru/dashboard')->assertForbidden();
        $this->actingAs($siswa)->get('/admin/dashboard')->assertForbidden();
    }

    public function test_student_can_create_a_forum_thread(): void
    {
        $user = User::where('email', 'siswa@bina.id')->first();
        $category = ForumCategory::first();

        $this->actingAs($user)->post('/forum', [
            'forum_category_id' => $category->id,
            'title' => 'Pertanyaan tentang fotosintesis',
            'body' => 'Bagaimana proses fotosintesis bekerja pada tanaman?',
        ]);

        $this->assertDatabaseHas('forum_threads', ['title' => 'Pertanyaan tentang fotosintesis']);
    }

    public function test_toxic_reply_is_flagged_by_moderation(): void
    {
        $user = User::where('email', 'siswa@bina.id')->first();
        $thread = ForumThread::first();

        $this->actingAs($user)->post("/forum/{$thread->id}/replies", [
            'body' => 'Kamu bodoh sekali tidak berguna',
        ]);

        $reply = ForumReply::where('body', 'Kamu bodoh sekali tidak berguna')->firstOrFail();
        (new ModerateForumReply($reply->id))->handle(app(LlamaService::class));

        $this->assertTrue($reply->fresh()->is_moderated);
    }

    public function test_battle_submission_scores_and_awards_points(): void
    {
        $user = User::where('email', 'siswa@bina.id')->first();
        $before = $user->total_character_points;
        $questions = BattleQuestion::take(2)->get();

        $answers = $questions->map(fn ($q) => [
            'question_id' => $q->id,
            'option_id' => $q->correct_option_id,
        ])->toArray();

        $this->actingAs($user)->postJson('/battle/submit', ['answers' => $answers])
            ->assertOk()
            ->assertJson(['win' => true, 'correct' => 2]);

        $this->assertGreaterThan($before, $user->fresh()->total_character_points);
    }

    public function test_accessibility_preferences_persist(): void
    {
        $user = User::where('email', 'siswa@bina.id')->first();

        $this->actingAs($user)->put('/aksesibilitas', [
            'high_contrast' => true,
            'font_scale' => 1.2,
            'speech_rate' => 1.5,
            'voice' => 'perempuan',
        ]);

        $this->assertTrue($user->fresh()->accessibility_preferences['high_contrast']);
    }
}
