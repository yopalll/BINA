<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'school_id', 'avatar_url', 'accessibility_preferences'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'accessibility_preferences' => 'array',
        ];
    }

    // ── Relationships ──

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function forumThreads(): HasMany
    {
        return $this->hasMany(ForumThread::class);
    }

    public function forumReplies(): HasMany
    {
        return $this->hasMany(ForumReply::class);
    }

    public function karyas(): HasMany
    {
        return $this->hasMany(Karya::class);
    }

    public function characterPoints(): HasMany
    {
        return $this->hasMany(CharacterPoint::class);
    }

    public function badges(): BelongsToMany
    {
        return $this->belongsToMany(Badge::class, 'user_badges')->withPivot('earned_at');
    }

    public function challengedMatches(): HasMany
    {
        return $this->hasMany(BattleMatch::class, 'challenger_id');
    }

    public function opponentMatches(): HasMany
    {
        return $this->hasMany(BattleMatch::class, 'opponent_id');
    }

    // ── Helpers ──

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isGuru(): bool
    {
        return $this->role === 'guru';
    }

    public function isSiswa(): bool
    {
        return $this->role === 'siswa';
    }
}
