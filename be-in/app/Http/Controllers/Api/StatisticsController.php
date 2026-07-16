<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TestResult;
use App\Models\Training;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $training = $this->resolveTraining($request);

        if (! $training) {
            return response()->json([
                'success' => true,
                'data' => $this->emptyStatistics(),
            ]);
        }

        $postTestIds = $training->tests()
            ->where('type', 'posttest')
            ->pluck('id');

        $preTestIds = $training->tests()
            ->where('type', 'pretest')
            ->pluck('id');

        $completedPreTestUserIds = TestResult::query()
            ->whereIn('test_id', $preTestIds)
            ->pluck('user_id');

        $results = TestResult::query()
            ->whereIn('test_id', $postTestIds)
            ->whereIn('user_id', $completedPreTestUserIds)
            ->whereHas('user.role', fn ($query) => $query->where('name', 'Karyawan'));

        $participantCount = (clone $results)->count();
        $passedCount = (clone $results)->where('status', 'Lulus')->count();
        $failedCount = (clone $results)->where('status', 'Tidak Lulus')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'title' => 'Statistik',
                'training' => [
                    'id' => $training->id,
                    'title' => $training->title,
                ],
                'average_score' => $this->formatNumber((clone $results)->avg('score')),
                'participant_count' => $participantCount,
                'passed_count' => $passedCount,
                'failed_count' => $failedCount,
                'highest_score' => (clone $results)->max('score') ?? 0,
                'lowest_score' => (clone $results)->min('score') ?? 0,
                'pass_percentage' => $participantCount > 0
                    ? $this->formatNumber(($passedCount / $participantCount) * 100)
                    : 0,
            ],
        ]);
    }

    private function resolveTraining(Request $request): ?Training
    {
        if ($request->filled('training_id')) {
            return Training::find($request->integer('training_id'));
        }

        return Training::query()
            ->where('is_active', true)
            ->orderByDesc('start_date')
            ->orderBy('id')
            ->first();
    }

    private function emptyStatistics(): array
    {
        return [
            'title' => 'Statistik',
            'training' => null,
            'average_score' => 0,
            'participant_count' => 0,
            'passed_count' => 0,
            'failed_count' => 0,
            'highest_score' => 0,
            'lowest_score' => 0,
            'pass_percentage' => 0,
        ];
    }

    private function formatNumber(null|int|float|string $value): int|float
    {
        $number = round((float) ($value ?? 0), 1);

        return fmod($number, 1.0) === 0.0 ? (int) $number : $number;
    }
}
