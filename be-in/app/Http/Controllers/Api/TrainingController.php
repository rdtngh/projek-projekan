<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Training;
use Illuminate\Http\JsonResponse;

class TrainingController extends Controller
{
    public function index(): JsonResponse
    {
        $trainings = Training::withCount(['materials', 'tests'])
            ->where('is_active', true)
            ->orderByDesc('start_date')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $trainings,
        ]);
    }

    public function show(Training $training): JsonResponse
    {
        $training->load([
            'materials.files',
            'tests',
        ]);

        return response()->json([
            'success' => true,
            'data' => $training,
        ]);
    }

    public function materials(Training $training): JsonResponse
    {
        $materials = $training->materials()
            ->with('files')
            ->orderBy('order_number')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $materials,
        ]);
    }
}
