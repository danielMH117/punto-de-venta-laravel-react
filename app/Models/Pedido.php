<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    // Campos que Laravel nos permitirá registrar directamente desde el formulario
    protected $fillable = [
        'user_id',
        'nombre_completo',
        'telefono',
        'direccion',
        'ciudad',
        'estado_republica',
        'codigo_postal',
        'total',
        'metodo_pago',
        'estado_pedido',
    ];

    /**
     * Relación: Un pedido pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación: Un pedido tiene muchos productos desglosados.
     */
    public function productos()
    {
        return $this->hasMany(PedidoProducto::class);
    }
}