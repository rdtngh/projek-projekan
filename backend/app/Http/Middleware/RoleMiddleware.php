<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();
        $userRole = $user?->role?->name;

        if (! $user || ! $userRole) {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak. Role pengguna tidak ditemukan.',
            ], 403);
        }

        $allowedRoles = collect($roles)
            ->map(fn (string $role) => strtolower(trim($role)))
            ->all();

        if (! in_array(strtolower($userRole), $allowedRoles, true)) {
            return response()->json([
                'success' => false,
                'message' => 'Akses ditolak. Role tidak memiliki izin.',
            ], 403);
        }

        return $next($request);
    }
}
