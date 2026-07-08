<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::insert([

            [
                'role_id' => 1,
                'employee_number' => '000001',
                'name' => 'Super Admin',
                'department' => 'IT',
                'position' => 'Super Administrator',
                'email' => 'superadmin@advent.local',
                'password' => Hash::make('admin123'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'role_id' => 2,
                'employee_number' => '000002',
                'name' => 'Admin Pelatihan',
                'department' => 'IT',
                'position' => 'Administrator',
                'email' => 'admin@advent.local',
                'password' => Hash::make('admin123'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'role_id' => 3,
                'employee_number' => '230001',
                'name' => 'Budi Santoso',
                'department' => 'IGD',
                'position' => 'Perawat',
                'email' => 'budi@advent.local',
                'password' => Hash::make('admin123'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'role_id' => 3,
                'employee_number' => '230002',
                'name' => 'Siti Amelia',
                'department' => 'Farmasi',
                'position' => 'Apoteker',
                'email' => 'siti@advent.local',
                'password' => Hash::make('admin123'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'role_id' => 3,
                'employee_number' => '230003',
                'name' => 'Andi Saputra',
                'department' => 'Rawat Inap',
                'position' => 'Perawat',
                'email' => 'andi@advent.local',
                'password' => Hash::make('admin123'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],

        ]);
    }
}