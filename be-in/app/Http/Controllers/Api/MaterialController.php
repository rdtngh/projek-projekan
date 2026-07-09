<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\JsonResponse;

class MaterialController extends Controller
{
    public function show(Material $material): JsonResponse
    {
        $material->load(['training', 'files']);

        return response()->json([
            'success' => true,
            'data' => $material,
        ]);
    }

    public function files(Material $material): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $material->files()->get(),
        ]);
    }
}
