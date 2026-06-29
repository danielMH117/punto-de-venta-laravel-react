import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ producto }) {
    // Inicializamos el formulario con los datos actuales del componente de hardware
    const { data, setData, put, processing, errors } = useForm({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        categoria: producto.categoria || 'PROCESADORES',
        imagen_url: producto.imagen_url || '',
    });

    const manejarEnvio = (e) => {
        e.preventDefault();
        // Dispara la petición PUT hacia el método update de Laravel
        put(route('admin.productos.update', producto.id));
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 block p-6">
            <Head title={`Admin | Editar ${producto.nombre}`} />

            <div className="max-w-2xl mx-auto space-y-6">
                <div className="border-b border-zinc-800 pb-4">
                    <h1 className="text-xl font-black tracking-wider text-white uppercase">
                        MODIFICAR <span className="text-cyan-400">COMPONENTE</span>
                    </h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                        Editando registro ID_REF: {producto.id}
                    </p>
                </div>

                <form onSubmit={manejarEnvio} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5 shadow-2xl">
                    {/* NOMBRE */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nombre del Componente</label>
                        <input 
                            type="text" required
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                        />
                        {errors.nombre && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.nombre}</p>}
                    </div>

                    {/* CATEGORÍA Y STOCK */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Categoría</label>
                            <select 
                                value={data.categoria}
                                onChange={e => setData('categoria', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 uppercase font-bold tracking-wider"
                            >
                                <option value="PROCESADORES">PROCESADORES</option>
                                <option value="TARJETAS DE VIDEO">TARJETAS DE VIDEO</option>
                                <option value="MEMORIAS RAM">MEMORIAS RAM</option>
                                <option value="ALMACENAMIENTO">ALMACENAMIENTO</option>
                                <option value="GABINETES">GABINETES</option>
                                <option value="FUENTES DE PODER">FUENTES DE PODER</option>
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Piezas en Stock</label>
                            <input 
                                type="number" required min="0"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                            />
                            {errors.stock && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.stock}</p>}
                        </div>
                    </div>

                    {/* PRECIO E IMAGEN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Precio (MXN)</label>
                            <input 
                                type="number" step="0.01" required min="0"
                                value={data.precio}
                                onChange={e => setData('precio', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                            />
                            {errors.precio && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.precio}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">URL de la Imagen</label>
                            <input 
                                type="url"
                                value={data.imagen_url}
                                onChange={e => setData('imagen_url', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                            />
                            {errors.imagen_url && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.imagen_url}</p>}
                        </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Descripción / Especificaciones</label>
                        <textarea 
                            required rows="4"
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                        />
                        {errors.descripcion && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.descripcion}</p>}
                    </div>

                    {/* BOTONES */}
                    <div className="flex items-center justify-end space-x-3 border-t border-zinc-800 pt-4 mt-2">
                        <Link
                            href={route('admin.productos.index')}
                            className="text-xs font-bold uppercase text-zinc-400 hover:text-white px-4 py-2.5 transition-colors"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className={`px-5 py-2.5 rounded text-xs font-black uppercase tracking-wider transition-all ${
                                processing 
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                                    : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/10'
                            }`}
                        >
                            {processing ? 'Actualizando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}