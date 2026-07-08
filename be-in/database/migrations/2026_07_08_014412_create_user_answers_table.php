<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_answers', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();

            $table->foreignId('question_id')
                  ->constrained()
                  ->cascadeOnUpdate()
                  ->cascadeOnDelete();

            $table->enum('selected_answer', [
                'A',
                'B',
                'C',
                'D'
            ]);

            $table->timestamps();

            $table->unique(
                ['user_id', 'question_id'],
                'user_question_unique'
            );

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_answers');
    }
};