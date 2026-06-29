import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 flex flex-col justify-center items-center p-6 relative select-none">
            <Head title="Nova Hardware | Iniciar Sesión" />

            {/* CONTENEDOR PRINCIPAL DEL LOGIN */}
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl space-y-6">
                
                {/* LOGO Y ENCABEZADO */}
                <div className="text-center space-y-2">
                    <div className="inline-flex h-10 w-10 rounded bg-cyan-500 items-center justify-center mb-2 mx-auto">
                        <span className="text-black font-black text-lg">N</span>
                    </div>
                    <h1 className="text-xl font-black tracking-wider text-white uppercase">
                        INGRESAR A <span className="text-cyan-400">NOVA HARDWARE</span>
                    </h1>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                        Inicia sesión para procesar tu orden de hardware
                    </p>
                </div>

                {status && (
                    <div className="mb-4 font-bold text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded text-center uppercase tracking-wider">
                        {status}
                    </div>
                )}

                {/* FORMULARIO */}
                <form onSubmit={submit} className="space-y-4">
                    
                    {/* EMAIL */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium transition-colors"
                            placeholder="ejemplo@hardware.com"
                            required
                        />
                        <InputError message={errors.email} className="mt-1 text-xs text-rose-500 font-bold uppercase tracking-wider" />
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1">
                        <div className="flex justify-between items-center">
                            <label htmlFor="password" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                Contraseña
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[10px] text-gray-500 hover:text-cyan-400 font-bold uppercase tracking-wider transition-colors"
                                >
                                    ¿La olvidaste?
                                </Link>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                            placeholder="••••••••••••"
                            required
                        />
                        <InputError message={errors.password} className="mt-1 text-xs text-rose-500 font-bold uppercase tracking-wider" />
                    </div>

                    {/* RECUÉRDAME */}
                    <div className="block mt-2">
                        <label className="flex items-center cursor-pointer group">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded bg-black border-zinc-800 text-cyan-500 focus:ring-0 focus:ring-offset-0"
                            />
                            <span className="ms-2 text-[10px] font-bold uppercase text-gray-400 group-hover:text-gray-300 tracking-wider select-none">
                                Recordar sesión
                            </span>
                        </label>
                    </div>

                    {/* BOTÓN DE ACCIÓN */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                processing 
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                                    : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/10'
                            }`}
                        >
                            {processing ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>

                {/* ENLACE PARA CREAR CUENTA */}
                <div className="border-t border-zinc-800 pt-4 text-center">
                    <p className="text-xs text-gray-400">
                        ¿No tienes una cuenta de cliente?{' '}
                        <Link
                            href={route('register')}
                            className="text-cyan-400 hover:text-cyan-300 font-black uppercase tracking-wider transition-colors ml-1"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

            </div>

            {/* BOTÓN SECUNDARIO PARA REGRESAR A LA TIENDA */}
            <Link 
                href="/" 
                className="mt-6 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
            >
                ← Cancelar y volver al catálogo
            </Link>
        </div>
    );
}