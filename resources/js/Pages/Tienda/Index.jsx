import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
// Importamos el componente Dropdown original de Breeze para usarlo en la tienda
import Dropdown from '@/Components/Dropdown';

export default function Index({ productos = [] }) {
    const { auth } = usePage().props;
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
    const [carritoAbierto, setCarritoAbierto] = useState(false);
    
    // 1. MODIFICADO: El estado ahora inicia buscando si ya hay datos guardados en el navegador
    const [carrito, setCarrito] = useState(() => {
        if (typeof window !== 'undefined') {
            const carritoGuardado = localStorage.getItem('nova_carrito');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        }
        return [];
    });

    // 2. NUEVO: Función auxiliar para actualizar el estado de React y la memoria local al mismo tiempo
    const actualizarCarritoYMemoria = (nuevoCarrito) => {
        setCarrito(nuevoCarrito);
        localStorage.setItem('nova_carrito', JSON.stringify(nuevoCarrito));
    };

    const categorias = ['Todos', 'Procesadores', 'Tarjetas Gráficas', 'Laptops', 'Memoria RAM', 'Almacenamiento', 'Fuentes de Poder', 'Gabinetes', 'Periféricos'];

    const productosFiltrados = categoriaSeleccionada === 'Todos'
        ? productos
        : productos.filter(p => p.categoria === categoriaSeleccionada);

    // MODIFICADO: Agregar producto usando la nueva función de persistencia
    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(item => item.id === producto.id);
        let nuevoCarrito = [];

        if (existe) {
            if (existe.cantidad < producto.stock) {
                nuevoCarrito = carrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            } else {
                alert(`Lo sentimos, no hay más stock disponible de: ${producto.nombre}`);
                return;
            }
        } else {
            nuevoCarrito = [...carrito, { ...producto, cantidad: 1 }];
        }

        actualizarCarritoYMemoria(nuevoCarrito);
    };

    // CORREGIDO: Se añadió 'carrito.map' para evitar fallos de referencia
    const restarDelCarrito = (id) => {
        const producto = carrito.find(item => item.id === id);
        let nuevoCarrito = [];

        if (producto.cantidad === 1) {
            nuevoCarrito = carrito.filter(item => item.id !== id);
        } else {
            nuevoCarrito = carrito.map(item =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
            );
        }

        actualizarCarritoYMemoria(nuevoCarrito);
    };

    // MODIFICADO: Eliminar del carrito usando la nueva función de persistencia
    const eliminarDelCarrito = (id) => {
        const nuevoCarrito = carrito.filter(item => item.id !== id);
        actualizarCarritoYMemoria(nuevoCarrito);
    };

    // Calcular totales dinámicos
    const totalArticulos = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    const totalDinero = carrito.reduce((acumulador, item) => acumulador + (parseFloat(item.precio) * item.cantidad), 0);

    const manejarCheckout = () => {
        window.location.href = '/tienda/checkout';
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 block relative">
            <Head title="Nova Hardware | Tienda Gamer" />
            

            {/* NAV BAR */}
            <nav className="w-full bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded bg-cyan-500 flex items-center justify-center">
                            <span className="text-black font-black text-sm">N</span>
                        </div>
                        <span className="text-xl font-black tracking-wider text-cyan-400">
                            NOVA HARDWARE
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        
                        {/* CANDADO DE INTERFAZ EXCLUSIVO PARA ADMINISTRADORES */}
                        {auth && auth.user && auth.user.role === 'admin' && (
                            <div className="flex items-center gap-2 bg-zinc-950 border border-purple-950/60 p-1 rounded-md">
                                <span className="text-[9px] font-black tracking-widest text-purple-500 uppercase px-2 font-mono">
                                    Panel:
                                </span>
                                <Link 
                                    href="/admin/productos" 
                                    className="text-[10px] font-black tracking-wider uppercase bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 px-3 py-1.5 rounded transition-colors"
                                >
                                    📦 CRUD Productos
                                </Link>
                                <Link 
                                    href="/users"
                                    className="text-[10px] font-black tracking-wider uppercase bg-zinc-900 hover:bg-zinc-800 text-purple-400 border border-zinc-800 px-3 py-1.5 rounded transition-colors"
                                >
                                    👥 CRUD Usuarios
                                </Link>
                            </div>
                        )}

                        <button 
                            onClick={() => setCarritoAbierto(!carritoAbierto)}
                            className="relative text-gray-400 hover:text-cyan-400 flex items-center space-x-2 group p-2 rounded bg-zinc-950 border border-zinc-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-cyan-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <span className="text-xs font-black bg-cyan-500 text-black rounded-full px-2 py-0.5">
                                {totalArticulos}
                            </span>
                        </button>

                        {/* MODIFICADO: Reemplazo del botón estático por el menú desplegable */}
                        {auth && auth.user ? (
                            <div className="relative z-50">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-950 px-4 py-2 text-xs font-black uppercase tracking-wider text-zinc-400 transition duration-150 ease-in-out hover:text-cyan-400 hover:bg-zinc-900 focus:outline-none"
                                            >
                                                <span>{auth.user.name}</span>
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4 text-cyan-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content
                                        contentClasses="py-1 bg-zinc-950 border border-zinc-800 rounded-md shadow-xl"
                                    >
                                        <Dropdown.Link
                                            href={route('dashboard')}
                                            className="block w-full px-4 py-2 text-start text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900 transition duration-150 ease-in-out"
                                        >
                                            Mi Panel
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2 text-start text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 transition duration-150 ease-in-out"
                                        >
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href={route('login')} className="text-xs font-bold text-gray-400 hover:text-white uppercase">
                                    Iniciar Sesión
                                </Link>
                                <Link href={route('register')} className="bg-cyan-500 text-black font-bold px-4 py-1.5 rounded text-xs uppercase tracking-wider hover:bg-cyan-400">
                                    Crear Cuenta
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* INTERFAZ LATERAL DEL CARRITO (SLIDEOVER) */}
            {carritoAbierto && (
                <div className="fixed inset-0 bg-black/70 z-50 flex justify-end backdrop-blur-sm">
                    <div className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl">
                        
                        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
                            <div className="flex items-center space-x-2">
                                <span className="font-black tracking-wider uppercase text-sm text-white">Tu Carrito</span>
                                <span className="text-xs font-bold bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30">
                                    {totalArticulos} pzs
                                </span>
                            </div>
                            <button 
                                onClick={() => setCarritoAbierto(false)}
                                className="text-gray-400 hover:text-rose-400 transition-colors uppercase font-bold text-xs"
                            >
                                Cerrar ✕
                            </button>
                        </div>

                        <div className="p-4 flex-1 overflow-y-auto space-y-4">
                            {carrito.length > 0 ? (
                                carrito.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg gap-3">
                                        <img 
                                            src={item.imagen_url || 'https://via.placeholder.com/300'} 
                                            alt={item.nombre} 
                                            className="w-12 h-12 object-cover rounded border border-zinc-800 bg-black"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold text-white truncate">{item.nombre}</h4>
                                            <p className="text-[10px] text-cyan-400 font-bold uppercase">{item.categoria}</p>
                                            <p className="text-xs font-black text-gray-300 mt-0.5">
                                                ${parseFloat(item.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>

                                        <div className="flex flex-col items-center space-y-1">
                                            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded">
                                                <button onClick={() => restarDelCarrito(item.id)} className="px-2 py-0.5 text-gray-400 hover:text-white font-bold text-xs">-</button>
                                                <span className="px-2 text-xs font-mono font-bold text-cyan-400">{item.cantidad}</span>
                                                <button onClick={() => agregarAlCarrito(item)} className="px-2 py-0.5 text-gray-400 hover:text-white font-bold text-xs">+</button>
                                            </div>
                                            <button 
                                                onClick={() => eliminarDelCarrito(item.id)}
                                                className="text-[10px] uppercase font-bold text-rose-500 hover:text-rose-400 tracking-wider"
                                            >
                                                Quitar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-16 text-gray-600">
                                    <p className="text-xs uppercase font-bold tracking-wider">El carrito está vacío</p>
                                    <p className="text-[10px] mt-1 text-gray-500">Añade componentes para armar tu Setup.</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t border-zinc-800 bg-zinc-950 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total estimado:</span>
                                <span className="text-xl font-black text-cyan-400">
                                    ${totalDinero.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                            
                            <button
                                onClick={manejarCheckout}
                                disabled={carrito.length === 0}
                                className={`w-full py-3 rounded text-xs font-black uppercase tracking-wider transition-colors ${
                                    carrito.length > 0
                                        ? 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/10'
                                        : 'bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800'
                                }`}
                            >
                                Proceder al pago
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* HERO BANNER */}
            <header className="w-full bg-zinc-900/50 py-12 text-center border-b border-zinc-800/50">
                <h1 className="text-3xl font-black uppercase text-white tracking-tight">
                    POTENCIA TU <span className="text-cyan-400">SETUP GAMER</span>
                </h1>
                <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto uppercase tracking-widest">
                    Componentes de última generación y laptops listas para la batalla.
                </p>
            </header>

            {/* CONTENIDO */}
            <main className="max-w-7xl mx-auto p-6">
                
                {/* FILTROS */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider border transition-colors ${
                                categoriaSeleccionada === cat
                                    ? 'bg-cyan-500 border-cyan-500 text-black'
                                    : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:text-white hover:border-zinc-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* GRID DE PRODUCTOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((producto) => (
                            <div key={producto.id} className="bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between overflow-hidden shadow-xl hover:border-cyan-500/50 transition-colors">
                                
                                <div className="h-40 bg-black relative flex items-center justify-center overflow-hidden">
                                    <img 
                                        src={producto.imagen_url || 'https://via.placeholder.com/300'} 
                                        alt={producto.nombre}
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                    <span className="absolute top-2 right-2 bg-black/80 text-cyan-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-zinc-800">
                                        {producto.categoria}
                                    </span>
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-sm text-white line-clamp-2 min-h-[2.5rem]">
                                            {producto.nombre}
                                        </h3>
                                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                                            {producto.descripcion}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                                            <span className="text-md font-black text-white">
                                                ${parseFloat(producto.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                            </span>
                                            <span className={`text-[10px] font-bold uppercase ${producto.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                {producto.stock > 0 ? `${producto.stock} Pzs` : 'Agotado'}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => agregarAlCarrito(producto)}
                                            disabled={producto.stock === 0}
                                            className={`mt-3 w-full py-2 px-4 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                                                producto.stock > 0
                                                    ? 'bg-transparent text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black hover:border-cyan-500'
                                                    : 'bg-zinc-950 text-zinc-600 border border-zinc-900 cursor-not-allowed'
                                            }`}
                                        >
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 border border-zinc-800 rounded">
                            <p className="text-gray-500 text-sm font-bold uppercase">No hay productos en esta categoría.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}