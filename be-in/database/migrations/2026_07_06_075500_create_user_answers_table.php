<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_answers', function (Blueprint $table) {

            $table->id();

            $table->foreignId('assessment_attempt_id')
                ->constrained('assessment_attempts')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreignId('question_id')
                ->constrained('questions')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->foreignId('question_option_id')
                ->constrained('question_options')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->timestamps();

            // Custom Unique Index (menghindari nama index terlalu panjang)
            $table->unique(
                ['assessment_attempt_id', 'question_id'],
                'user_answer_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};