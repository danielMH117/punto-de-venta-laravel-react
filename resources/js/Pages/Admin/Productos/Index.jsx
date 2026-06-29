import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ productos, totalComponentes, valorInventario, stockCritico }) {

    // Función para procesar la baja definitiva del producto en MariaDB
    const manejarEliminar = (id, nombre) => {
        if (confirm(`¿Estás seguro de que deseas eliminar definitivamente el producto: ${nombre}?`)) {
            router.delete(route('admin.productos.destroy', id), {
                onSuccess: () => alert("Componente eliminado del inventario correctamente.")
            });
        }
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 block p-6">
            <Head title="Admin | Gestión de Inventario" />

            {/* ENCABEZADO DE LA SECCIÓN */}
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-800 pb-5 mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-wider text-white uppercase">
                        PANEL DE <span className="text-cyan-400">INVENTARIO</span>
                    </h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                        Altas, bajas y actualizaciones de componentes de hardware
                    </p>
                </div>
                <Link
                    href={route('admin.productos.create')}
                    className="inline-flex items-center justify-center bg-cyan-500 text-black font-black text-xs uppercase tracking-wider px-5 py-3 rounded hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/10"
                >
                    + Agregar Componente
                </Link>
            </div>

            {/* 📊 SECCIÓN DE MÉTRICAS ESTADÍSTICAS */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                
                {/* TARJETA 1: VALOR DEL INVENTARIO */}
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Valor del Inventario</p>
                    <p className="text-2xl font-black text-white font-mono mt-2 text-cyan-400">
                        ${valorInventario.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Capital total en hardware</p>
                </div>

                {/* TARJETA 2: TOTAL DE COMPONENTES */}
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Modelos Registrados</p>
                    <p className="text-2xl font-black text-white font-mono mt-2 text-purple-400">
                        {totalComponentes} <span className="text-xs text-zinc-500 font-sans">REF</span>
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Variedad en catálogo público</p>
                </div>

                {/* TARJETA 3: STOCK CRÍTICO */}
                <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Alertas de Reabastecimiento</p>
                    <p className="text-2xl font-black text-white font-mono mt-2 text-rose-500">
                        {stockCritico} <span className="text-xs text-zinc-500 font-sans">PZS</span>
                    </p>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-1">Componentes con menos de 5 uds.</p>
                </div>

            </div>

            {/* TABLA DE PRODUCTOS */}
            <div className="max-w-7xl mx-auto bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-zinc-950 border-b border-zinc-800 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                                <th className="p-4 w-20">Imagen</th>
                                <th className="p-4">Componente</th>
                                <th className="p-4">Categoría</th>
                                <th className="p-4 text-right">Precio</th>
                                <th className="p-4 text-center">Stock</th>
                                <th className="p-4 text-center w-40">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60 text-sm">
                            {productos.length > 0 ? (
                                productos.map((prod) => (
                                    <tr key={prod.id} className="hover:bg-zinc-950/40 transition-colors">
                                        {/* IMAGEN */}
                                        <td className="p-4">
                                            <img
                                                src={prod.imagen_url || 'https://via.placeholder.com/300'}
                                                alt={prod.nombre}
                                                className="w-12 h-12 object-cover rounded border border-zinc-800 bg-black"
                                            />
                                        </td>
                                        {/* NOMBRE Y ID */}
                                        <td className="p-4 font-bold text-white">
                                            <div>{prod.nombre}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono mt-0.5">ID_REF: {prod.id}</div>
                                        </td>
                                        {/* CATEGORÍA */}
                                        <td className="p-4">
                                            <span className="text-xs uppercase bg-zinc-950 px-2 py-1 border border-zinc-800 rounded text-gray-300 font-medium">
                                                {prod.categoria || 'General'}
                                            </span>
                                        </td>
                                        {/* PRECIO */}
                                        <td className="p-4 text-right font-bold text-cyan-400 font-mono">
                                            ${parseFloat(prod.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        </td>
                                        {/* STOCK */}
                                        <td className="p-4 text-center">
                                            <span className={`font-mono text-xs px-2 py-1 rounded font-bold ${prod.stock > 5 ? 'text-emerald-400 bg-emerald-500/5' : 'text-rose-400 bg-rose-500/5'}`}>
                                                {prod.stock} pzs
                                            </span>
                                        </td>
                                        {/* ACCIONES (EDITAR / ELIMINAR) */}
                                        <td className="p-4 text-center space-x-2">
                                            <Link
                                                href={route('admin.productos.edit', prod.id)}
                                                className="text-[10px] uppercase font-bold text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2.5 py-1.5 rounded transition-colors"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => manejarEliminar(prod.id, prod.nombre)}
                                                className="text-[10px] uppercase font-bold text-rose-500 hover:text-rose-400 border border-rose-950 hover:border-rose-800 bg-rose-950/10 px-2.5 py-1.5 rounded transition-colors"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-zinc-500 uppercase tracking-wider text-xs font-bold">
                                        No hay componentes registrados en el inventario.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* BOTÓN RETORNO */}
            <div className="max-w-7xl mx-auto mt-6 text-left">
                <Link href="/" className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors">
                    ← Volver a la Tienda Pública
                </Link>
            </div>
        </div>
    );
}