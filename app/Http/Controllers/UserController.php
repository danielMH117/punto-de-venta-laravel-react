<?php

namespace App\Http\Controllers;

use App\Models\User; 
use App\Models\Role; 
use Inertia\Inertia; 
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        // Traemos todos los usuarios (puedes mantener el with('roles') si lo usas en otra parte,
        // pero ahora nuestra vista lee directo la columna 'role')
        $users = User::with('roles')->get();
        $roles = Role::all(); 
        
        return Inertia::render('Users/index', [
            'users' => $users,
            'roles' => $roles
        ]);
    }

    // Función para CREAR OPERADOR
    public function store(Request $request)
    {
        // Validamos los datos entrantes para evitar fallos de base de datos
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:admin,user', // Validamos que llegue 'admin' o 'user'
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'], // Guardamos el rol en la columna de texto de la BD
        ]);

        return redirect()->back(); 
    }

    // Función para ACTUALIZAR OPERADOR
    public function update(Request $request, User $user)
    {
        // Validamos los datos, ignorando el email del propio usuario actual para que no choque
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6', // Contraseña opcional al editar
            'role' => 'required|string|in:admin,user',
        ]);

        // Preparamos los datos básicos a actualizar
        $dataToUpdate = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'role' => $validated['role'], // Actualizamos la columna string de rol
        ];

        // Si el administrador escribió una nueva contraseña, la encriptamos y la añadimos
        if (!empty($validated['password'])) {
            $dataToUpdate['password'] = bcrypt($validated['password']);
        }

        $user->update($dataToUpdate);

        return redirect()->back();
    }

    // Función para ELIMINAR OPERADOR
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back();
    }
}