<?php

namespace Database\Seeders;

use App\Models\Test;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['pretest', 'posttest'] as $type) {
            Test::updateOrCreate(
                [
                    'training_id' => 1,
                    'type' => $type,
                ],
                [
                    'duration' => 30,
                    'passing_score' => 70,
                ]
            );
        }
    }
}
