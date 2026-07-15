<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KaryaReaction extends Model
{
    protected $fillable = ['karya_id', 'user_id', 'emoji'];

    public function karya(): BelongsTo
    {
        return $this->belongsTo(Karya::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
