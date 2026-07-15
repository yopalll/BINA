<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('battle_questions', function (Blueprint $table) {
            $table->id();
            $table->string('subject'); // e.g., Matematika, IPA
            $table->text('scenario'); // Real-world scenario text
            $table->string('question');
            $table->json('options'); // Array of {id, text, correct}
            $table->string('correct_option_id');
            $table->text('explanation')->nullable();
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
            $table->string('p5_dimension')->nullable(); // Which P5 dimension it tests
            $table->timestamps();

            $table->index(['subject', 'difficulty']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('battle_questions');
    }
};
