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
        $admin = Role::updateOrCreate(['name' => 'Administrador']);
        Role::updateOrCreate(['name' => 'Cliente']);

        // 2. Creamos al usuario
        $user = User::updateOrCreate(
            ['email' => 'daniel@example.com'],
            [
                'name' => 'Daniel',
                'password' => bcrypt('password123'),
            ]
        );

        // 3. Relacionamos al usuario con el rol (CORREGIDO CON CORCHETES)
        $admin = Role::updateOrCreate(['name' => 'Administrador']);

        // 4. LLAMAR AL SEEDER DE PRODUCTOS (NUEVO)
        $this->call(ProductoSeeder::class);
    }
}
