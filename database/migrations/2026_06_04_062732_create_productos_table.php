<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('categoria'); // Procesadores, Tarjetas Gráficas, Laptops, Fuentes de Poder, Periféricos
            $table->text('descripcion');
            $table->decimal('precio', 10, 2);
            $table->integer('stock')->default(0); // Control de disponibilidad (altas/bajas)
            $table->string('imagen_url')->nullable(); // Para colocar fotos de los componentes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
