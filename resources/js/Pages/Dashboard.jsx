import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react'; // Importación de Link añadida

export default function Dashboard({ auth, compras = [] }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={null}
        >
            <Head title="Mi Panel | Perfil" />

            <div className="py-12 bg-black min-h-screen text-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">

                    {/* ENCABEZADO MODIFICADO CON BOTÓN */}
                    <div className="border-b border-zinc-800 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-black tracking-wider text-white uppercase">
                                MI <span className="text-cyan-400">PANEL DE USUARIO</span>
                            </h2>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                                Gestiona tu información de perfil y revisa tu historial de pedidos en Nova Hardware
                            </p>
                        </div>
                        
                        {/* BOTÓN IR A LA TIENDA */}
                        <div>
                            <Link
                                href="/" // Cambia "/" por la ruta exacta de tu catálogo si es diferente
                                className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-400 text-cyan-400 hover:text-black rounded-lg text-xs font-black tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={2.5} 
                                    stroke="currentColor" 
                                    className="w-4 h-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                Volver a la Tienda
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* PANEL DE DATOS DEL USUARIO */}
                        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl">
                            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-6 border-b border-zinc-800 pb-2">
                                Datos del Cliente
                            </h3>

                            <div className="space-y-4">
                                <div className="bg-zinc-900/60 p-4 border border-zinc-800/80 rounded-lg">
                                    <span className="block text-[9px] uppercase font-bold text-zinc-500 tracking-widest mb-1">Nombre Completo</span>
                                    <span className="text-sm font-bold text-white tracking-wide">{user.name}</span>
                                </div>

                                <div className="bg-zinc-900/60 p-4 border border-zinc-800/80 rounded-lg">
                                    <span className="block text-[9px] uppercase font-bold text-zinc-500 tracking-widest mb-1">Correo Electrónico</span>
                                    <span className="text-sm font-mono text-cyan-400">{user.email}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-zinc-900/60 p-4 border border-zinc-800/80 rounded-lg">
                                        <span className="block text-[9px] uppercase font-bold text-zinc-500 tracking-widest mb-1">ID de Cliente</span>
                                        <span className="text-sm font-mono text-zinc-300">#NH-{user.id}</span>
                                    </div>
                                    <div className="bg-zinc-900/60 p-4 border border-zinc-800/80 rounded-lg">
                                        <span className="block text-[9px] uppercase font-bold text-zinc-500 tracking-widest mb-1">Miembro Desde</span>
                                        <span className="text-xs font-bold text-zinc-300">
                                            {new Date(user.created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PANEL DEL HISTORIAL DE COMPRAS */}
                        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl">
                            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-6 border-b border-zinc-800 pb-2">
                                Historial de Compras
                            </h3>

                            {compras.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs border-collapse">
                                        <thead>
                                            <tr className="border-b border-zinc-800 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                                                <th className="py-3 px-2">ID Pedido</th>
                                                <th className="py-3 px-2">Fecha</th>
                                                <th className="py-3 px-2">Método de Pago</th>
                                                <th className="py-3 px-2">Total</th>
                                                <th className="py-3 px-2 text-right">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-900 font-medium">
                                            {compras.map((pedido) => (
                                                <tr key={pedido.id} className="hover:bg-zinc-900/40 transition-colors text-zinc-300">
                                                    <td className="py-3 px-2 font-mono text-cyan-400 font-bold">
                                                        #PED-{pedido.id}
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        {new Date(pedido.created_at).toLocaleDateString('es-MX', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="py-3 px-2 uppercase font-mono text-[11px] text-zinc-400">
                                                        {pedido.metodo_pago}
                                                    </td>
                                                    <td className="py-3 px-2 font-bold text-white">
                                                        ${parseFloat(pedido.total).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    {/* CELDA DE ESTADO CORREGIDA (Sin doble <td> interno) */}
                                                    <td className="py-3 px-2 text-right">
                                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                                            pedido.estado_pedido === 'entregado' || pedido.estado_pedido === 'completado'
                                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                                : pedido.estado_pedido === 'pendiente'
                                                                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                                    : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                                                        }`}>
                                                            {pedido.estado_pedido}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-zinc-600 border border-dashed border-zinc-800 rounded-lg">
                                    <p className="text-xs uppercase font-bold tracking-wider">Aún no has realizado ninguna compra</p>
                                    <p className="text-[10px] mt-1 text-zinc-500">Tus pedidos guardados en el sistema aparecerán listados aquí.</p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}