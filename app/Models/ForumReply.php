<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ForumReply extends Model
{
    protected $fillable = [
        'forum_thread_id', 'user_id', 'body', 'voice_url',
        'is_moderated', 'moderation_reason', 'moderation_source', 'reactions',
    ];

    protected function casts(): array
    {
        return [
            'is_moderated' => 'boolean',
            'reactions' => 'array',
        ];
    }

    public function thread(): BelongsTo
    {
        return $this->belongsTo(ForumThread::class, 'forum_thread_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
