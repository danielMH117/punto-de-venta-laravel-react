<?php

namespace App\Http\Controllers;
use App\Models\Permission;
use Inertia\Inertia;

use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index()
    {
        // Obtenemos todos los permisos de la tabla
        $permissions = Permission::all();

        // Los enviamos a la vista de React
        return Inertia::render('Permissions/Index', [
            'permissions' => $permissions
        ]);
    }
}
