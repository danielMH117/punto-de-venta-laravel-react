<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedido_productos', function (Blueprint $Blueprint) {
            $Blueprint->id();
            // Llaves foráneas
            $Blueprint->foreignId('pedido_id')->constrained('pedidos')->onDelete('cascade');
            $Blueprint->foreignId('producto_id')->constrained('productos')->onDelete('cascade');
            
            // Historial de la venta
            $Blueprint->integer('cantidad');
            $Blueprint->decimal('precio_unitario', 10, 2); // Se guarda el precio del momento exacto de compra
            
            $Blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pedido_productos');
    }
};