<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Karya extends Model
{
    protected $fillable = [
        'user_id', 'title', 'description', 'type', 'media_url',
        'content', 'status', 'approved_by', 'character_points',
        'peer_approvals', 'required_approvals',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function reactions(): HasMany
    {
        return $this->hasMany(KaryaReaction::class);
    }
}
