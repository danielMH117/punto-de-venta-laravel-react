# Sistema de gestion de Usuario y Roles

El Objetivo de este proyecto es crear un sistema capas de realizar operaciones basicas de un Gestor de usuarios CRUD(create,read,update y delete), a traves de herramientas tecnologicas usadas dentro de Consorcio Nova.

# Tecnologias Utilizadas
-Laravel(Backend): Framework que proporciona una estructura profesional (MVC) para gestionar la lógica, seguridad y conexión a base de datos.
-MySQL(Base de Datos): Es un SGBD
-React(Frontend): Framework encardo de la GUI de usuarios

# Gestores de dependencias
-NODE.js: Endtorno de ejecucion para JavaScript
-Composer: Gestor de dependencias en PHP
-Laragon: Entorno de desarrollo local 
-Inertia: Actúa como puente para construir aplicaciones de una sola página (SPA) usando rutas y controladores de Laravel

# Mirgaciones 
-Users
-roles
-permissions
-users_has_roles
-roles_has_permissions

# Controladores
-UserController
-PermissionController

# Modelos
-Role
-User
-Permission

# Funcionalidades 

1. CRUD completo: creacion, lectura, actualizacion y eliminacion de registros
2. Sistema de roles: Implementacion de relacion de N:M (Many to Many) entre usuarios y roles
3. Interfaz SPA: Navegacion fluia y reactiva sin recargar la pagina gracias al puente Inertia.js 
4. Diseno responsivo: Pagina adaptativa gracias a Tailwind

# instalacion

1. instalas dependencias de PHP
   //bash

   composer install

2. instalar dependencias de forntend 
   //bash

   npm install
  
3. Configurar el entorno
 -Crea tu base de datos en MySQL.
 -Copia el archivo ".env.example" a ".env" y configura tus credenciales de DB.
 -Genera la clave: "php artisan key:generate`".

4.  Migraciones y Seeders:
    Prepara las tablas y los roles iniciales (Administrador, Gerente, Becario, etc.):
     //bash
    php artisan migrate:fresh --seed
    

## Autor
**Daniel** - Estudiante de Ingeniería en Sistemas Computacionales en el Tecnológico de Estudios Superiores de Tianguistenco (6° Semestre).

