<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidoProducto extends Model
{
    use HasFactory;

    // Definimos el nombre exacto de la tabla ya que Laravel por defecto busca en plural inglés
    protected $table = 'pedido_productos';

    protected $fillable = [
        'pedido_id',
        'producto_id',
        'cantidad',
        'precio_unitario',
    ];

    /**
     * Relación: Este desglose pertenece a un pedido principal.
     */
    public function pedido()
    {
        return $this->belongsTo(Pedido::class);
    }

    /**
     * Relación: Este desglose hace referencia a un producto del inventario.
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}