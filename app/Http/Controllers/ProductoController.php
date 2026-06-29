<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductoController extends Controller
{
    /**
     * Muestra la tabla con el inventario completo para el Administrador.
     */
    /**
     * Muestra la tabla con el inventario completo y las métricas para el Admin.
     */
    public function index()
    {
        // 1. Jalamos todos los productos
        $productos = Producto::all();

        // 2. Calculamos las métricas usando Eloquent y MariaDB
        $totalComponentes = $productos->count();
        
        // Suma el (precio * stock) de todos los registros en la BD
        $valorInventario = Producto::selectRaw('SUM(precio * stock) as total')->value('total') ?? 0;
        
        // Cuenta cuántos productos tienen menos de 5 piezas en stock
        $stockCritico = Producto::where('stock', '<', 5)->count();

        // 3. Mandamos todo a la vista de React
        return Inertia::render('Admin/Productos/Index', [
            'productos'        => $productos,
            'totalComponentes' => $totalComponentes,
            'valorInventario'  => (float)$valorInventario,
            'stockCritico'     => $stockCritico
        ]);
    }

    /**
     * Muestra el formulario para crear un producto nuevo.
     */
    public function create()
    {
        return Inertia::render('Admin/Productos/Create');
    }

    /**
     * Guarda el producto nuevo en MariaDB.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio'      => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'categoria'   => 'required|string|max:100',
            'imagen_url'  => 'nullable|url',
        ]);

        Producto::create([
            'nombre'      => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio'      => $request->precio,
            'stock'       => $request->stock,
            'categoria'   => $request->categoria,
            'imagen_url'  => $request->imagen_url,
        ]);

        return redirect()->route('admin.productos.index')->with('success', 'Componente agregado con éxito.');
    }

    /**
     * Muestra el formulario de edición con los datos del producto cargados.
     */
    public function edit(Producto $producto)
    {
        return Inertia::render('Admin/Productos/Edit', [
            'producto' => $producto
        ]);
    }

    /**
     * Procesa los cambios del hardware en la base de datos.
     */
    public function update(Request $request, Producto $producto)
    {
        $request->validate([
            'nombre'      => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio'      => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'categoria'   => 'required|string|max:100',
            'imagen_url'  => 'nullable|url',
        ]);

        $producto->update([
            'nombre'      => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio'      => $request->precio,
            'stock'       => $request->stock,
            'categoria'   => $request->categoria,
            'imagen_url'  => $request->imagen_url,
        ]);

        return redirect()->route('admin.productos.index')->with('success', 'Componente actualizado con éxito.');
    }

    /**
     * Da de baja el componente de la base de datos.
     */
    public function destroy(Producto $producto)
    {
        $producto->delete();

        return redirect()->route('admin.productos.index')->with('success', 'Componente eliminado del inventario.');
    }
}