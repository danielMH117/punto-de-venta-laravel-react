<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role; // Importamos el modelo Role para que sea más fácil usarlo
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Guardamos solo el que vamos a usar para el sync
        $admin = Role::UpdateOrCreate(['name' => 'Administrador']);
        //solo creamos los roles
        Role::UpdateOrCreate(['name' => 'Cliente']);
    
        // 2. Creamos al usuario (Separamos búsqueda de creación)
    $user = User::UpdateOrCreate(
    ['email' => 'daniel@example.com'],
    [                                  
        'name' => 'Daniel',
        'password' => bcrypt('password123'),
    ]
);

        // 3. Relacionamos al usuario con el rol de Administrador
        $user->roles()->syncWithoutDetaching($admin->id);
        
    }
}
