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
        // Cambiamos "Administrador" por "administrador" en minúsculas
        $admin = Role::updateOrCreate(['name' => 'administrador']);
        Role::updateOrCreate(['name' => 'Cliente']);

        // Creamos al usuario
        $user = User::updateOrCreate(
            ['email' => 'daniel@example.com'],
            [
                'name' => 'Daniel',
                'password' => bcrypt('password123'),
            ]
        );

        // Relacionamos al usuario con el rol
        $user->roles()->syncWithoutDetaching([$admin->id]);

        // Llamar al seeder de productos
        $this->call(ProductoSeeder::class);
    }
}
