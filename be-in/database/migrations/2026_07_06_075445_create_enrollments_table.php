<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->foreignId('training_batch_id')
                ->constrained('training_batches')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->date('enrollment_date');

            $table->enum('status', [
                'ENROLLED',
                'IN_PROGRESS',
                'COMPLETED',
                'CANCELLED'
            ])->default('ENROLLED');

            $table->timestamps();

            $table->unique(['user_id', 'training_batch_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};