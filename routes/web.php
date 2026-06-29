<?php

use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TiendaController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. RUTA DE BIENVENIDA / TIENDA PÚBLICA
// Modificamos la raíz para que muestre el catálogo de componentes en lugar de la pantalla estática de Laravel
Route::get('/', [TiendaController::class, 'index'])->name('tienda.index');

// 2. PANEL DE DASHBOARD PRINCIPAL
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// 3. RUTAS PROTEGIDAS (REQUIEREN INICIAR SESIÓN)
Route::middleware('auth')->group(function () {
    
    // Perfil de usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
   
    
    
    // Ocultamos visualmente la ventana de permisos en la navegación, pero mantenemos su ruta intacta por seguridad
    Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions.index');

    // === NUEVA RUTA: GESTIÓN DE PRODUCTOS (ALTAS, BAJAS, CAMBIOS) ===
    // Al usar 'resource', Laravel crea automáticamente las rutas index, create, store, edit, update y destroy
    Route::resource('productos', ProductoController::class);
    Route::get('/tienda/checkout', [TiendaController::class, 'checkout'])->name('tienda.checkout');
    Route::post('/tienda/procesar-pago', [TiendaController::class, 'procesarPago'])->name('tienda.procesar_pago');
    // 🚀 AGREGA ESTA LÍNEA PARA EL CRUD DE ADMINISTRACIÓN:
    
});
Route::middleware(['auth', 'admin'])->group(function () {
    // Aquí adentro pones tus rutas del CRUD de productos y usuarios...
    Route::resource('admin/productos', ProductoController::class)->names('admin.productos');
    Route::resource('users', UserController::class);
});


require __DIR__.'/auth.php';