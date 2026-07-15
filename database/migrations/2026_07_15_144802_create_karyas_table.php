<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('karyas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('type', ['tulisan', 'gambar', 'aksi', 'prakarya', 'puisi', 'video']);
            $table->string('media_url')->nullable(); // Cloudflare R2 URL
            $table->text('content')->nullable(); // For text-based karya
            $table->enum('status', ['draft', 'pending', 'approved', 'rejected'])->default('draft');
            $table->foreignId('approved_by')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedInteger('character_points')->default(0);
            $table->unsignedInteger('peer_approvals')->default(0);
            $table->unsignedInteger('required_approvals')->default(3); // Crowdsource validation
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['type', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('karyas');
    }
};
