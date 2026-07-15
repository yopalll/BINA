<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('forum_replies', function (Blueprint $table) {
            $table->string('moderation_reason')->nullable()->after('is_moderated');
            $table->string('moderation_source')->nullable()->after('moderation_reason');
        });
    }

    public function down(): void
    {
        Schema::table('forum_replies', function (Blueprint $table) {
            $table->dropColumn(['moderation_reason', 'moderation_source']);
        });
    }
};
