<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('offline_contents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->enum('type', ['materi', 'forum', 'kuis', 'karya']);
            $table->string('subject')->nullable();
            $table->text('content')->nullable();
            $table->string('file_url')->nullable();
            $table->unsignedInteger('file_size_kb')->default(0);
            $table->string('checksum')->nullable();
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('offline_contents');
    }
};
