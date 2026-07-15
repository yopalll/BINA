<?php

namespace App\Jobs;

use App\Models\ForumReply;
use App\Services\LlamaService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

/**
 * Second-layer moderation: runs asynchronously so the reply appears instantly
 * while the AI check happens in the background (queue). If flagged, the reply
 * is marked moderated and hidden pending teacher review.
 */
class ModerateForumReply implements ShouldQueue
{
    use Queueable;

    public function __construct(public int $replyId) {}

    public function handle(LlamaService $llama): void
    {
        $reply = ForumReply::find($this->replyId);

        if (! $reply) {
            return;
        }

        $result = $llama->moderate($reply->body);

        if ($result['flagged']) {
            $reply->update([
                'is_moderated' => true,
                'moderation_reason' => $result['reason'],
                'moderation_source' => $result['source'],
            ]);
        }
    }
}
