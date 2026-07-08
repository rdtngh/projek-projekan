<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('test_results', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->foreignId('test_id')
                  ->constrained()
                  ->cascadeOnDelete();

            $table->integer('score');

            $table->integer('correct_answers');

            $table->integer('wrong_answers');

            $table->enum('status', [
                'Lulus',
                'Tidak Lulus'
            ]);

            $table->timestamp('started_at')->nullable();

            $table->timestamp('finished_at')->nullable();

            $table->timestamps();

            $table->unique(
                ['user_id', 'test_id'],
                'user_test_unique'
            );

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('test_results');
    }
};