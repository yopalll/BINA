<?php

namespace App\Http\Controllers;

use App\Jobs\ModerateForumReply;
use App\Models\ForumCategory;
use App\Models\ForumReply;
use App\Models\ForumThread;
use App\Services\LlamaService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = ForumCategory::query()
            ->withCount('threads')
            ->orderBy('sort_order')
            ->get()
            ->map(fn (ForumCategory $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'icon' => $c->icon,
                'color' => $c->color,
                'threads' => $c->threads_count,
                'lastActive' => optional($c->threads()->max('last_activity_at'))
                    ? \Carbon\Carbon::parse($c->threads()->max('last_activity_at'))->diffForHumans()
                    : 'Belum ada aktivitas',
            ]);

        $trending = ForumThread::query()
            ->with(['user:id,name', 'category:id,name'])
            ->where('is_moderated', false)
            ->orderByDesc('reply_count')
            ->limit(5)
            ->get()
            ->map(fn (ForumThread $t) => [
                'id' => $t->id,
                'title' => $t->title,
                'subject' => $t->category->name,
                'replies' => $t->reply_count,
                'author' => $t->user->name,
            ]);

        return Inertia::render('Forum/Index', [
            'categories' => $categories,
            'trending' => $trending,
        ]);
    }

    public function show(Request $request, ForumThread $thread): Response
    {
        $thread->load(['user:id,name,role', 'category:id,name,icon,color']);

        $replies = $thread->replies()
            ->with('user:id,name,role')
            ->where('is_moderated', false)
            ->orderBy('created_at')
            ->get()
            ->map(fn (ForumReply $r) => [
                'id' => $r->id,
                'author' => $r->user->name,
                'role' => $r->user->role,
                'body' => $r->body,
                'voice_url' => $r->voice_url,
                'reactions' => $r->reactions ?? [],
                'time' => $r->created_at->diffForHumans(),
            ]);

        return Inertia::render('Forum/Show', [
            'thread' => [
                'id' => $thread->id,
                'title' => $thread->title,
                'body' => $thread->body,
                'author' => $thread->user->name,
                'category' => $thread->category->name,
                'icon' => $thread->category->icon,
                'color' => $thread->category->color,
                'time' => $thread->created_at->diffForHumans(),
                'is_locked' => $thread->is_locked,
            ],
            'replies' => $replies,
        ]);
    }

    public function storeThread(Request $request, LlamaService $llama): RedirectResponse
    {
        $data = $request->validate([
            'forum_category_id' => ['required', 'exists:forum_categories,id'],
            'title' => ['required', 'string', 'max:150'],
            'body' => ['required', 'string', 'max:5000'],
        ]);

        // Server-side second-layer moderation (synchronous for the opening post
        // so obviously toxic threads never appear).
        $result = $llama->moderate($data['title'].' '.$data['body']);

        $thread = ForumThread::create([
            ...$data,
            'user_id' => $request->user()->id,
            'is_moderated' => $result['flagged'],
            'last_activity_at' => now(),
        ]);

        if ($result['flagged']) {
            return back()->with('error', 'Topik ditahan moderasi: '.$result['reason']);
        }

        return redirect()->route('forum.show', $thread)->with('success', 'Topik berhasil dibuat!');
    }

    public function storeReply(Request $request, ForumThread $thread): RedirectResponse
    {
        abort_if($thread->is_locked, 403, 'Diskusi ini telah dikunci.');

        $data = $request->validate([
            'body' => ['required', 'string', 'max:3000'],
        ]);

        $reply = $thread->replies()->create([
            'user_id' => $request->user()->id,
            'body' => $data['body'],
        ]);

        $thread->increment('reply_count');
        $thread->update(['last_activity_at' => now()]);

        // Async second-layer AI moderation — reply is visible immediately.
        ModerateForumReply::dispatch($reply->id);

        return back()->with('success', 'Balasan terkirim!');
    }

    public function react(Request $request, ForumReply $reply): RedirectResponse
    {
        $data = $request->validate([
            'emoji' => ['required', 'string', 'in:👍,❤️,🎉'],
        ]);

        $reactions = $reply->reactions ?? [];
        $reactions[$data['emoji']] = ($reactions[$data['emoji']] ?? 0) + 1;
        $reply->update(['reactions' => $reactions]);

        return back();
    }
}
