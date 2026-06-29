import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    // Inicializamos el formulario controlado de Inertia
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        categoria: 'PROCESADORES', // Valor por defecto
        imagen_url: '',
    });

    const manejarEnvio = (e) => {
        e.preventDefault();
        // Dispara la petición POST hacia el método store del controlador
        post(route('admin.productos.store'));
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 block p-6">
            <Head title="Admin | Nuevo Componente" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* ENCABEZADO */}
                <div className="border-b border-zinc-800 pb-4">
                    <h1 className="text-xl font-black tracking-wider text-white uppercase">
                        REGISTRAR <span className="text-cyan-400">NUEVO COMPONENTE</span>
                    </h1>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                        Llena los datos para subir hardware al inventario de la tienda
                    </p>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={manejarEnvio} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5 shadow-2xl">
                    
                    {/* NOMBRE DEL PRODUCTO */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nombre del Componente</label>
                        <input 
                            type="text"
                            required
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                            placeholder="Ej. Tarjeta de Video NVIDIA RTX 5060"
                        />
                        {errors.nombre && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.nombre}</p>}
                    </div>

                    {/* CATEGORÍA Y STOCK (GRID) */}
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
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Piezas en Stock (Inventario)</label>
                            <input 
                                type="number"
                                required
                                min="0"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                                placeholder="Ej. 15"
                            />
                            {errors.stock && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.stock}</p>}
                        </div>
                    </div>

                    {/* PRECIO E IMAGEN (GRID) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Precio de Venta (MXN)</label>
                            <input 
                                type="number"
                                step="0.01"
                                required
                                min="0"
                                value={data.precio}
                                onChange={e => setData('precio', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                                placeholder="Ej. 8499.00"
                            />
                            {errors.precio && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.precio}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">URL de la Imagen (Link)</label>
                            <input 
                                type="url"
                                value={data.imagen_url}
                                onChange={e => setData('imagen_url', e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                placeholder="https://ejemplo.com/foto.jpg"
                            />
                            {errors.imagen_url && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.imagen_url}</p>}
                        </div>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Descripción / Especificaciones Técnicas</label>
                        <textarea 
                            required
                            rows="4"
                            value={data.descripcion}
                            onChange={e => setData('descripcion', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                            placeholder="Describe los detalles clave del componente (frecuencia, sockets, núcleos, etc.)..."
                        />
                        {errors.descripcion && <p className="text-xs text-rose-500 font-bold uppercase mt-1">{errors.descripcion}</p>}
                    </div>

                    {/* BOTONES DE ACCIÓN */}
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
                            {processing ? 'Guardando...' : 'Guardar Componente'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}