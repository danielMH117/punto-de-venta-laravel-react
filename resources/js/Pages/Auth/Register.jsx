import React, { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <div className="w-full min-h-screen bg-black text-gray-100 flex flex-col justify-center items-center p-6 relative select-none">
            <Head title="Nova Hardware | Crear Cuenta" />

            {/* CONTENEDOR PRINCIPAL DEL REGISTRO */}
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-xl shadow-2xl space-y-6">
                
                {/* LOGO Y ENCABEZADO */}
                <div className="text-center space-y-2">
                    <div className="inline-flex h-10 w-10 rounded bg-cyan-500 items-center justify-center mb-2 mx-auto">
                        <span className="text-black font-black text-lg">N</span>
                    </div>
                    <h1 className="text-xl font-black tracking-wider text-white uppercase">
                        REGISTRO DE <span className="text-cyan-400">NUEVO CLIENTE</span>
                    </h1>
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest">
                        Crea una cuenta para guardar tus configuraciones y compras
                    </p>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={submit} className="space-y-4">
                    
                    {/* NOMBRE */}
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Nombre Completo
                        </label>
                        <input
                            id="name"
                            name="name"
                            value={data.name}
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium transition-colors"
                            placeholder="Ej. Daniel López"
                            required
                        />
                        <InputError message={errors.name} className="mt-1 text-xs text-rose-500 font-bold uppercase tracking-wider" />
                    </div>

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
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-medium transition-colors"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                        <InputError message={errors.email} className="mt-1 text-xs text-rose-500 font-bold uppercase tracking-wider" />
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                            placeholder="Mínimo 8 caracteres"
                            required
                        />
                        <InputError message={errors.password} className="mt-1 text-xs text-rose-500 font-bold uppercase tracking-wider" />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="space-y-1">
                        <label htmlFor="password_confirmation" className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full bg-black border border-zinc-800 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 font-mono transition-colors"
                            placeholder="Repite tu contraseña"
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-1 text-xs text-rose-500 font-bold uppercase tracking-wider" />
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
                            {processing ? 'Registrando...' : 'Crear Cuenta'}
                        </button>
                    </div>
                </form>

                {/* ENLACE PARA VOLVER AL LOGIN */}
                <div className="border-t border-zinc-800 pt-4 text-center">
                    <p className="text-xs text-gray-400">
                        ¿Ya tienes una cuenta registrada?{' '}
                        <Link
                            href={route('login')}
                            className="text-cyan-400 hover:text-cyan-300 font-black uppercase tracking-wider transition-colors ml-1"
                        >
                            Inicia sesión aquí
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