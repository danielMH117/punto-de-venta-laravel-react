<?php

namespace App\Http\Controllers;

use App\Models\User; // Importamos el modelo User
use App\Models\Role; // También necesitaremos el modelo Role para el formulario
use Inertia\Inertia; // Importamos la herramienta para React
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->get();
        $roles = Role::all(); // Enviamos los roles para poder elegirlos en el formulario de "Crear"
        
        return Inertia::render('Users/index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    // Función para CREAR
    public function store(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        // Conectamos con el rol elegido en el formulario
        $user->roles()->attach($request->role_id);

        return redirect()->back(); // Refresca la tabla automáticamente
    }

    // Función para ACTUALIZAR
    public function update(Request $request, User $user)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        // sync() borra el rol anterior y pone el nuevo en la tabla intermedia
        $user->roles()->sync([$request->role_id]);

        return redirect()->back();
    }

    // Función para ELIMINAR
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back();
    }
}