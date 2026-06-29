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

    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(item => item.id === producto.id);
        if (existe) {
            if (existe.cantidad < producto.stock) {
                actualizarCarritoYMemoria(
                    carrito.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)
                );
            }
        } else {
            actualizarCarritoYMemoria([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const cambiarCantidad = (id, cambio) => {
        const productoInCarrito = carrito.find(item => item.id === id);
        const productoOriginal = productos.find(p => p.id === id);
        
        if (!productoInCarrito || !productoOriginal) return;

        const nuevaCantidad = productoInCarrito.cantidad + cambio;

        if (nuevaCantidad <= 0) {
            actualizarCarritoYMemoria(carrito.filter(item => item.id !== id));
        } else if (nuevaCantidad <= productoOriginal.stock) {
            actualizarCarritoYMemoria(
                carrito.map(item => item.id === id ? { ...item, cantidad: nuevaCantidad } : item)
            );
        }
    };

    const vaciarCarrito = () => {
        actualizarCarritoYMemoria([]);
    };

    const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-cyan-500 selection:text-black">
            <Head title="Nova Hardware - Tienda" />

            {/* BARRA DE NAVEGACIÓN GLITCH / FUTURISTA */}
            <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900 px-6 py-4 flex items-center justify-between shadow-[0_1px_20px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-3">
                    <span className="text-xl font-black tracking-tighter text-white font-mono">
                        NOVA<span className="text-cyan-400 animate-pulse">_</span>HARDWARE
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    {/* CANDADO DE INTERFAZ EXCLUSIVO PARA ADMINISTRADORES (CORREGIDO PARA PRODUCCIÓN) */}
                    {auth && auth.user && (auth.user.role === 'admin' || auth.user.role === 'administrador') && (
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

                    {/* SECCIÓN DE USUARIO / AUTENTICACIÓN */}
                    <div className="flex items-center gap-4 border-l border-zinc-800 pl-6">
                        {auth.user ? (
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors focus:outline-none">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                                            {auth.user.name}
                                            <svg className="ms-1 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content align="right" width="48" contentClasses="bg-zinc-950 border border-zinc-800 py-1 text-zinc-400">
                                        <Dropdown.Link href={route('dashboard')} className="block w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 hover:text-cyan-400 transition-colors">
                                            Dashboard
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('profile.edit')} className="block w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 hover:text-cyan-400 transition-colors">
                                            Perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="block w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-wider hover:bg-zinc-900 hover:text-red-400 transition-colors">
                                            Cerrar Sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                                    Login
                                </Link>
                                <Link href={route('register')} className="text-xs font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-cyan-400 border border-zinc-800 px-3 py-1.5 rounded transition-colors">
                                    Registro
                                </Link>
                            </>
                        )}

                        {/* BOTÓN CARRITO */}
                        <button 
                            onClick={() => setCarritoAbierto(true)}
                            className="relative bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 p-2 rounded transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {carrito.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-black font-mono font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                    {carrito.reduce((sum, item) => sum + item.cantidad, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* SIDEBAR DEL CARRITO INTERACTIVO */}
            {carritoAbierto && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-900 h-full p-6 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                            <h2 className="text-sm font-black uppercase tracking-widest text-white font-mono">⚡ TU ORDEN _</h2>
                            <button onClick={() => setCarritoAbierto(false)} className="text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-wider">
                                [ Cerrar ]
                            </button>
                        </div>

                        {/* LISTA DE ITEMS */}
                        <div className="flex-1 overflow-y-auto py-4 space-y-3 custom-scrollbar">
                            {carrito.length === 0 ? (
                                <div className="text-center py-12 text-zinc-600 font-mono text-xs uppercase">
                                    El carrito está vacío
                                </div>
                            ) : (
                                carrito.map(item => (
                                    <div key={item.id} className="flex gap-4 p-3 border border-zinc-900 rounded bg-zinc-950/50 hover:border-zinc-800 transition-colors">
                                        <img src={item.imagen_url} alt={item.nombre} className="w-16 h-16 object-cover rounded bg-zinc-900 border border-zinc-800" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-bold uppercase tracking-wide truncate text-gray-200">{item.nombre}</h4>
                                            <p className="text-xs font-mono text-cyan-400 mt-1">${Number(item.precio).toLocaleString()}</p>
                                            
                                            <div className="flex items-center gap-2 mt-2">
                                                <button onClick={() => cambiarCantidad(item.id, -1)} className="w-5 h-5 border border-zinc-800 hover:border-zinc-700 rounded flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors">-</button>
                                                <span className="text-xs font-mono text-white w-4 text-center">{item.style ? item.style : item.cantidad}</span>
                                                <button onClick={() => cambiarCantidad(item.id, 1)} className="w-5 h-5 border border-zinc-800 hover:border-zinc-700 rounded flex items-center justify-center text-xs text-zinc-400 hover:text-white transition-colors">+</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* TOTAL Y ACCIONES */}
                        {carrito.length > 0 && (
                            <div className="border-t border-zinc-900 pt-4 mt-auto space-y-4">
                                <div className="flex justify-between items-baseline">
                                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Subtotal:</span>
                                    <span className="text-lg font-mono font-black text-cyan-400">${total.toLocaleString()}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={vaciarCarrito} className="py-2.5 px-4 border border-zinc-900 hover:bg-zinc-900 rounded text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors">
                                        Vaciar
                                    </button>
                                    <button className="py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CONTENIDO PRINCIPAL */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* FILTRO DE CATEGORÍAS */}
                <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-zinc-900">
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                                categoriaSeleccionada === cat
                                    ? 'bg-cyan-500 text-black font-black shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                                    : 'bg-zinc-950 text-zinc-400 border border-zinc-900 hover:border-zinc-800 hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* GRILLA DE PRODUCTOS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map(producto => (
                            <div 
                                key={producto.id} 
                                className="group relative bg-zinc-950 border border-zinc-900 hover:border-cyan-500/30 rounded overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300"
							>
                                <div className="relative aspect-square overflow-hidden bg-zinc-900 border-b border-zinc-900">
                                    <img 
                                        src={producto.imagen_url} 
                                        alt={producto.nombre} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {producto.stock === 0 && (
                                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                                            <span className="text-xs font-mono font-black tracking-widest text-red-500 border border-red-500/30 bg-red-950/20 px-3 py-1 rounded uppercase">Agotado _</span>
                                        </div>
                                    )}
                                    {producto.stock > 0 && producto.stock <= 3 && (
                                        <div className="absolute top-2 right-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                                            Últimas {producto.stock} uds
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{producto.categoria}</span>
                                        <h3 className="text-sm font-bold uppercase tracking-wide text-white mt-1 group-hover:text-cyan-400 transition-colors line-clamp-2">{producto.nombre}</h3>
                                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2">{producto.descripcion}</p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-zinc-900">
                                        <div className="flex justify-between items-baseline">
                                            <span className="text-xs font-mono text-zinc-500">PRECIO //</span>
                                            <span className="text-base font-mono font-black text-cyan-400">${Number(producto.precio).toLocaleString()}</span>
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