<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('battle_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenger_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('opponent_id')->constrained('users')->cascadeOnDelete();
            $table->enum('mode', ['quick', 'ranked', 'friendly']);
            $table->enum('status', ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->unsignedInteger('challenger_score')->default(0);
            $table->unsignedInteger('opponent_score')->default(0);
            $table->foreignId('winner_id')->nullable()->constrained('users')->nullOnDelete();
            $table->unsignedInteger('total_questions')->default(5);
            $table->unsignedInteger('time_per_question')->default(30); // seconds
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('battle_matches');
    }
};
