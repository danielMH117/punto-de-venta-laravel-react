<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Pedido;
use App\Models\PedidoProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TiendaController extends Controller
{
    public function index()
    {
        // Jalamos TODOS los productos ordenados del más reciente al más viejo
        $productos = Producto::latest()->get();
        
        return Inertia::render('Tienda/Index', [
            'productos' => $productos
        ]);
    }

    public function checkout()
    {
        return Inertia::render('Tienda/Checkout');
    }

    /**
     * 🚀 Recibe el formulario de pago, crea el pedido y descuenta el stock.
     */
    public function procesarPago(Request $request)
    {
        // 1. Validar estrictamente los datos del formulario de envío
        $request->validate([
            'datos_envio.nombre_completo' => 'required|string|max:255',
            'datos_envio.telefono'        => 'required|string|max:15',
            'datos_envio.direccion'       => 'required|string|max:255',
            'datos_envio.ciudad'          => 'required|string|max:255',
            'datos_envio.estado_republica'=> 'required|string|max:255',
            'datos_envio.codigo_postal'   => 'required|string|max:10',
            'datos_envio.metodo_pago'     => 'required|string',
            'articulos'                   => 'required|array|min:1',
            'total'                       => 'required|numeric'
        ]);

        // Iniciamos la transacción para proteger MariaDB
        DB::beginTransaction();

        try {
            $datosEnvio = $request->input('datos_envio');

            // 2. Crear el registro principal del Pedido
            $pedido = Pedido::create([
                'user_id'          => Auth::id(), // ID del usuario logueado
                'nombre_completo'  => $datosEnvio['nombre_completo'],
                'telefono'         => $datosEnvio['telefono'],
                'direccion'        => $datosEnvio['direccion'],
                'ciudad'           => $datosEnvio['ciudad'],
                'estado_republica' => $datosEnvio['estado_republica'],
                'codigo_postal'    => $datosEnvio['codigo_postal'],
                'total'            => $request->input('total'),
                'metodo_pago'      => $datosEnvio['metodo_pago'],
                'estado_pedido'    => 'pendiente',
            ]);

            // 3. Recorrer los artículos para el desglose y descontar stock
            foreach ($request->input('articulos') as $item) {
                
                // Buscamos el producto en el inventario actual
                $producto = Producto::find($item['id']);

                if (!$producto) {
                    throw new \Exception("El componente con ID {$item['id']} ya no existe en el inventario.");
                }

                // Verificar si hay suficiente stock disponible
                if ($producto->stock < $item['cantidad']) {
                    throw new \Exception("Stock insuficiente para el producto: {$producto->nombre}. Disponibles: {$producto->stock}");
                }

                // Restar las piezas del stock y guardar en BD
                $producto->stock -= $item['cantidad'];
                $producto->save();

                // Registrar en la tabla intermedia de desglose
                PedidoProducto::create([
                    'pedido_id'       => $pedido->id,
                    'producto_id'     => $producto->id,
                    'cantidad'        => $item['cantidad'],
                    'precio_unitario' => $item['precio'], // Guardamos el precio histórico
                ]);
            }

            // Si todo salió bien, guardamos definitivamente los cambios en MariaDB
            DB::commit();

            // Redirigimos al catálogo con un mensaje de éxito que React pueda leer
            return redirect()->route('tienda.index')->with('success', '¡Pedido realizado con éxito!');

        } catch (\Exception $e) {
            // Si algo falló, deshacemos todo para evitar errores en el inventario
            DB::rollBack();

            // Regresamos al checkout mostrando el error exacto
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }
}