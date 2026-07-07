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
        Schema::create('assessment_attempts', function (Blueprint $table) {

            $table->id();

            $table->foreignId('enrollment_id')
                ->constrained('enrollments')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreignId('assessment_id')
                ->constrained('assessments')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->unsignedSmallInteger('attempt_number')->default(1);

            $table->decimal('score', 5, 2)->default(0);

            $table->timestamp('started_at');

            $table->timestamp('finished_at')->nullable();

            $table->timestamps();

            // Custom Unique Index (menghindari nama index terlalu panjang)
            $table->unique(
                ['enrollment_id', 'assessment_id', 'attempt_number'],
                'assessment_attempt_unique'
            );
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_attempts');
    }
};