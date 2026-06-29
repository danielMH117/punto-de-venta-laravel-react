<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $Blueprint) {
            $Blueprint->id();
            // Relación con el usuario que compra (Llave foránea)
            $Blueprint->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Datos de envío del formulario
            $Blueprint->string('nombre_completo');
            $Blueprint->string('telefono');
            $Blueprint->string('direccion');
            $Blueprint->string('ciudad');
            $Blueprint->string('estado_republica');
            $Blueprint->string('codigo_postal');
            
            // Datos del pago
            $Blueprint->decimal('total', 10, 2);
            $Blueprint->string('metodo_pago');
            $Blueprint->string('estado_pedido')->default('pendiente'); // pendiente, completado, cancelado
            
            $Blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};