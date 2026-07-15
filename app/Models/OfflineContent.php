<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfflineContent extends Model
{
    protected $fillable = [
        'title', 'type', 'subject', 'content',
        'file_url', 'file_size_kb', 'checksum', 'version',
    ];
}
