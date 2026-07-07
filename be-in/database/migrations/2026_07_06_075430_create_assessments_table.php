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
        Schema::create('assessments', function (Blueprint $table) {

            $table->id();

            $table->foreignId('training_id')
                ->constrained('trainings')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->enum('type', ['PRETEST', 'POSTTEST']);

            $table->string('title');

            $table->text('description')->nullable();

            $table->unsignedSmallInteger('duration');

            $table->boolean('status')->default(true);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};