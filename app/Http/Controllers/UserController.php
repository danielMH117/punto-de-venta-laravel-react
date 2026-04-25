<?php

namespace App\Http\Controllers;

use App\Models\User; //Importamos el modelo User
use Inertia\Inertia; //  Importamos la herramienta para React

class UserController extends Controller
{
    public function index(){

        $users=User::with('roles')->get();

        return Inertia::render('Users/Index', ['users' => $users]);
    }
    //
}
