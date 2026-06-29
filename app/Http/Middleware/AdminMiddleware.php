<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Validamos que esté logueado y que su rol sea estrictamente 'admin'
        if (auth()->check() && auth()->user()->role === 'admin') {
            return $next($request); // Lo dejamos pasar
        }

        // 2. Si es un usuario común ('user') u otra cosa, lo botamos a la tienda principal
        return redirect('/')->with('error', 'Acceso denegado. Se requieren permisos de administrador.');
    }
}