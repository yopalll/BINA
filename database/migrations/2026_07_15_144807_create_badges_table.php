<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('badges', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // e.g., Duta Anti-Hoaks, Pahlawan Lingkungan
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('icon')->nullable(); // Emoji or icon URL
            $table->string('criteria_type'); // e.g., points_threshold, karya_count, battle_wins
            $table->unsignedInteger('criteria_value')->default(0);
            $table->string('p5_dimension')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('badges');
    }
};
