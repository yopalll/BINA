<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BattleQuestion extends Model
{
    protected $fillable = [
        'subject', 'scenario', 'question', 'options',
        'correct_option_id', 'explanation', 'difficulty', 'p5_dimension',
    ];

    protected function casts(): array
    {
        return ['options' => 'array'];
    }
}
