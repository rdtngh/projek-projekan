<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {

            $table->id();

            $table->foreignId('role_id')
                  ->constrained('roles')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            // Nomor karyawan untuk login
            $table->string('employee_number',20)->unique();

            $table->string('name');

            $table->string('department');

            $table->string('position');

            $table->string('email')->nullable()->unique();

            $table->string('password');

            $table->rememberToken();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};