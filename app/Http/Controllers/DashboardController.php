<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB; // Corregido el namespace sin el "5"
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Obtenemos el ID del usuario logueado
        $userId = auth()->id();

        // 2. Traemos los pedidos reales de la tabla 'pedidos'
        $compras = DB::table('pedidos')
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        // 3. Renderizamos el Dashboard pasándole la variable correcta
        return Inertia::render('Dashboard', [
            'compras' => $compras
        ]);
    }
}