import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Checkout() {
    // Estado local para recuperar el carrito del navegador al cargar la página
    const [carrito, setCarrito] = useState([]);
    
    useEffect(() => {
        const carritoGuardado = localStorage.getItem('nova_carrito');
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado));
        }
    }, []);

    // Formulario controlado utilizando la utilidad de Inertia
    const { data, setData, post, processing, errors } = useForm({
        nombre_completo: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        estado_republica: '',
        codigo_postal: '',
        metodo_pago: 'tarjeta', // Valor inicial por defecto
    });

    // Cálculos dinámicos del carrito en tiempo real
    const totalArticulos = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    const totalDinero = carrito.reduce((acumulador, item) => acumulador + (parseFloat(item.precio) * item.cantidad), 0);

    // Importa router arriba si no está importado: import { router } from '@inertiajs/react';
    // O mejor, usamos el método 'post' que ya tienes pero estructurando los datos correctamente:

    const manejarEnvioFormulario = (e) => {
        e.preventDefault();

        // Creamos el paquete exacto con la estructura de objetos anidados que pide Laravel
        const payload = {
            datos_envio: {
                nombre_completo: data.nombre_completo,
                telefono: data.telefono,
                direccion: data.direccion,
                ciudad: data.ciudad,
                estado_republica: data.estado_republica,
                codigo_postal: data.codigo_postal,
                metodo_pago: data.metodo_pago
            },
            articulos: carrito,
            total: totalDinero
        };

        // Usamos el router de Inertia para enviar el paquete limpio sin interferencias de useForm
        // Para esto, asegúrate de importar 'router' de @inertiajs/react si te marca error
        import('@inertiajs/react').then(({ router }) => {
            router.post(route('tienda.procesar_pago'), payload, {
                onSuccess: () => {
                    localStorage.removeItem('nova_carrito');
                    alert("¡Compra procesada con éxito! Tu pedido ha sido registrado.");
                },
                onError: (erroresServidor) => {
                    console.error("Errores del servidor:", erroresServidor);
                    alert("Hubo un error al procesar tu pedido: " + (erroresServidor.error || "Verifica tus datos."));
                }
            });
        });
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 block">
            <Head title="Nova Hardware | Finalizar Compra" />

            {/* NAV BAR SIMPLIFICADO PARA CHECKOUT */}
            <nav className="w-full bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="h-8 w-8 rounded bg-cyan-500 flex items-center justify-center">
                            <span className="text-black font-black text-sm">N</span>
                        </div>
                        <span className="text-xl font-black tracking-wider text-cyan-400 group-hover:text-cyan-300">
                            NOVA HARDWARE
                        </span>
                    </Link>
                    <Link href="/" className="text-xs font-bold text-gray-400 hover:text-white uppercase tracking-wider transition-colors">
                        ← Volver a la tienda
                    </Link>
                </div>
            </nav>

            {/* CUERPO DEL CHECKOUT */}
            <main className="max-w-6xl mx-auto p-6 mt-4">
                <h2 className="text-2xl font-black uppercase text-white tracking-tight mb-8">
                    FINALIZAR <span className="text-cyan-400">TU ORDEN</span>
                </h2>

                {carrito.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* SECCIÓN IZQUIERDA: FORMULARIOS (7 COLUMNAS) */}
                        <form onSubmit={manejarEnvioFormulario} className="lg:col-span-7 space-y-6">
                            
                            {/* Bloque 1: Datos de Envío */}
                            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
                                <h3 className="text-sm font-black uppercase text-cyan-400 tracking-wider border-b border-zinc-800 pb-2">
                                    1. Dirección de Envío
                                </h3>
                                
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Nombre Completo de quien recibe</label>
                                    <input 
                                        type="text"
                                        required
                                        value={data.nombre_completo}
                                        onChange={e => setData('nombre_completo', e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                                        placeholder="Ej. Juan Pérez López"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Teléfono de Contacto</label>
                                        <input 
                                            type="tel"
                                            required
                                            value={data.telefono}
                                            onChange={e => setData('telefono', e.target.value)}
                                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                                            placeholder="10 dígitos"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Código Postal (CP)</label>
                                        <input 
                                            type="text"
                                            required
                                            value={data.codigo_postal}
                                            onChange={e => setData('codigo_postal', e.target.value)}
                                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono"
                                            placeholder="54000"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Calle, Número y Colonia</label>
                                    <input 
                                        type="text"
                                        required
                                        value={data.direccion}
                                        onChange={e => setData('direccion', e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                        placeholder="Av. Tecnológico #123, Col. Centro"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Municipio / Ciudad</label>
                                        <input 
                                            type="text"
                                            required
                                            value={data.ciudad}
                                            onChange={e => setData('ciudad', e.target.value)}
                                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estado</label>
                                        <input 
                                            type="text"
                                            required
                                            value={data.estado_republica}
                                            onChange={e => setData('estado_republica', e.target.value)}
                                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                            placeholder="Estado de México"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bloque 2: Método de Pago */}
                            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
                                <h3 className="text-sm font-black uppercase text-cyan-400 tracking-wider border-b border-zinc-800 pb-2">
                                    2. Método de Pago
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <label className={`p-4 border rounded-xl flex items-start space-x-3 cursor-pointer transition-colors ${
                                        data.metodo_pago === 'tarjeta' ? 'bg-cyan-500/5 border-cyan-500' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                                    }`}>
                                        <input 
                                            type="radio" 
                                            name="metodo_pago" 
                                            value="tarjeta"
                                            checked={data.metodo_pago === 'tarjeta'}
                                            onChange={e => setData('metodo_pago', e.target.value)}
                                            className="mt-1 accent-cyan-500" 
                                        />
                                        <div>
                                            <span className="text-xs font-bold uppercase block text-white">Tarjeta Débito / Crédito</span>
                                            <span className="text-[10px] text-gray-400 mt-0.5 block">Visa, Mastercard, AMEX</span>
                                        </div>
                                    </label>

                                    <label className={`p-4 border rounded-xl flex items-start space-x-3 cursor-pointer transition-colors ${
                                        data.metodo_pago === 'transferencia' ? 'bg-cyan-500/5 border-cyan-500' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                                    }`}>
                                        <input 
                                            type="radio" 
                                            name="metodo_pago" 
                                            value="transferencia"
                                            checked={data.metodo_pago === 'transferencia'}
                                            onChange={e => setData('metodo_pago', e.target.value)}
                                            className="mt-1 accent-cyan-500" 
                                        />
                                        <div>
                                            <span className="text-xs font-bold uppercase block text-white">Transferencia SPEI</span>
                                            <span className="text-[10px] text-gray-400 mt-0.5 block">Pago inmediato por banca móvil</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                className="w-full bg-cyan-500 text-black font-black py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/10"
                            >
                                Confirmar y Realizar Pedido (${totalDinero.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN)
                            </button>
                        </form>

                        {/* SECCIÓN DERECHA: RESUMEN DE COMPRA (5 COLUMNAS) */}
                        <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-24 space-y-4">
                            <h3 className="text-sm font-black uppercase text-white tracking-wider border-b border-zinc-800 pb-2">
                                Resumen del Pedido
                            </h3>

                            {/* Lista de artículos */}
                            <div className="max-h-80 overflow-y-auto space-y-3 pr-1">
                                {carrito.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 bg-zinc-950 border border-zinc-800/60 rounded-lg gap-3">
                                        <img 
                                            src={item.imagen_url || 'https://via.placeholder.com/300'} 
                                            alt={item.nombre} 
                                            className="w-10 h-10 object-cover rounded border border-zinc-800 bg-black"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[11px] font-bold text-white truncate">{item.nombre}</h4>
                                            <p className="text-[9px] text-gray-400 font-medium">Cantidad: {item.amount || item.cantidad} pzs</p>
                                        </div>
                                        <span className="text-xs font-black text-cyan-400">
                                            ${(parseFloat(item.precio) * item.cantidad).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Desgloses finales */}
                            <div className="border-t border-zinc-800 pt-4 space-y-2 text-xs">
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Subtotal ({totalArticulos} productos):</span>
                                    <span>${totalDinero.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-medium">
                                    <span>Envío Asegurado:</span>
                                    <span className="text-emerald-400 font-bold uppercase text-[10px]">Gratis</span>
                                </div>
                                <div className="flex justify-between items-center text-white font-black border-t border-zinc-800 pt-3 text-sm">
                                    <span className="uppercase tracking-wider">Total a Pagar:</span>
                                    <span className="text-lg text-cyan-400">
                                        ${totalDinero.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : (
                    /* Render por si intentan entrar con carrito vacío */
                    <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-xl max-w-xl mx-auto p-6">
                        <p className="text-sm font-bold uppercase text-gray-400 tracking-wider">No tienes productos en tu carrito</p>
                        <p className="text-xs text-gray-500 mt-2">Regresa al catálogo principal para seleccionar componentes de hardware.</p>
                        <Link href="/" className="mt-6 inline-block bg-zinc-950 border border-zinc-800 text-cyan-400 font-bold text-xs uppercase px-6 py-2 rounded hover:border-cyan-500 transition-colors">
                            Ir a la Tienda
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}