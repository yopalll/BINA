<?php

namespace App\Http\Controllers;

use App\Models\OfflineContent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfflineController extends Controller
{
    public function index(Request $request): Response
    {
        $contents = OfflineContent::query()
            ->latest()
            ->get()
            ->map(fn (OfflineContent $c) => [
                'id' => $c->id,
                'title' => $c->title,
                'type' => $c->type,
                'subject' => $c->subject,
                'size_kb' => $c->file_size_kb,
                'version' => $c->version,
            ]);

        return Inertia::render('Offline/Index', [
            'contents' => $contents,
        ]);
    }
}
