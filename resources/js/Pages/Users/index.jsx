import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ auth, users, roles }) {
    // Cambiamos 'role_id' por 'role' para que coincida exactamente con la columna de la BD
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '', 
        name: '',
        email: '',
        password: '',
        role: '' // Ahora almacena 'admin' o 'user'
    });

    const eliminarUsuario = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar a este usuario?')) {
            router.delete(route('users.destroy', id), {
                onSuccess: () => alert('Usuario eliminado con éxito'),
            });
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.id) {
            put(route('users.update', data.id), {
                onSuccess: () => {
                    reset();
                    alert('Usuario actualizado correctamente');
                },
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => {
                    reset();
                    alert('Usuario creado correctamente');
                },
            });
        }
    };

    const prepararEdicion = (user) => {
        setData({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role || '', // Cargamos el string directo del rol que tiene el usuario ('admin' o 'user')
            password: '', 
        });
    };

    // Clase optimizada para romper el comportamiento de autocompletado blanco del navegador
    const inputStyle = "w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 font-medium transition-colors placeholder-zinc-700 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_#000000] [&:-webkit-autofill]:text-fill-white";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={null}
        >
            <Head title="Usuarios" />

            <div className="py-12 bg-black min-h-screen text-gray-100">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* ENCABEZADO INTEGRADO */}
                    <div className="border-b border-zinc-800 pb-4 mb-8">
                        <h2 className="text-xl font-black tracking-wider text-white uppercase">
                            CONTROL DE <span className="text-purple-500">USUARIOS Y ROLES</span>
                        </h2>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                            ADMINISTRACIÓN DE ACCESOS E IDENTIDADES DEL SISTEMA
                        </p>
                    </div>
                    
                    {/* CONTENEDOR PRINCIPAL */}
                    <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-2xl">
                        
                        {/* FORMULARIO DE USUARIO */}
                        <form onSubmit={submit} className="mb-8 p-6 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
                            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2">
                                {data.id ? 'Modificar Parámetros de Operador' : 'REGISTRAR NUEVO OPERADOR'}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1 tracking-wider">Nombre</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className={inputStyle}
                                        placeholder="Ej. Juan Pérez"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1 font-mono uppercase">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1 tracking-wider">Email</label>
                                    <input
                                        type="type"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className={`${inputStyle} font-mono`}
                                        placeholder="correo@ejemplo.com"
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1 font-mono uppercase">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1 tracking-wider">Contraseña</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className={`${inputStyle} font-mono`}
                                        placeholder={data.id ? 'Dejar vacío para mantener actual' : '••••••••'}
                                        required={!data.id}
                                    />
                                    {errors.password && <div className="text-red-500 text-xs mt-1 font-mono uppercase">{errors.password}</div>}
                                </div>

                                <div>
                                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1 tracking-wider">Rol Asignado</label>
                                    <select
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 uppercase font-bold text-xs tracking-wider transition-colors"
                                        required
                                    >
                                        <option value="" className="text-zinc-600">SELECCIONA UN ROL</option>
                                        {/* Mapeamos tus roles dinámicos, pero el value será 'admin' o 'user' */}
                                        {roles.map(role => {
                                            // Normalizamos el string: si el rol se llama 'administrador', lo guardamos como 'admin'. Si no, como 'user'.
                                            const roleValue = role.name.toLowerCase() === 'administrador' ? 'admin' : 'user';
                                            return (
                                                <option key={role.id} value={roleValue} className="text-white bg-zinc-900">
                                                    {role.name.toUpperCase()}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {errors.role && <div className="text-red-500 text-xs mt-1 font-mono uppercase">{errors.role}</div>}
                                </div>
                            </div>

                            <div className="mt-5 flex gap-2 border-t border-zinc-800/60 pt-4">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-5 py-2 bg-purple-600 text-white font-black text-xs uppercase tracking-wider rounded hover:bg-purple-500 disabled:opacity-50 transition-colors shadow-md shadow-purple-600/10"
                                >
                                    {data.id ? 'Actualizar Usuario' : 'Crear Usuario'}
                                </button>

                                {data.id && (
                                    <button 
                                        type="button" 
                                        onClick={() => reset()} 
                                        className="px-5 py-2 bg-zinc-800 text-zinc-400 font-black text-xs uppercase tracking-wider rounded hover:bg-zinc-700 hover:text-white transition-colors border border-zinc-700"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* TABLA DE USUARIOS */}
                        <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-900/40">
                            <table className="min-w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-950 border-b border-zinc-800 text-[10px] uppercase font-bold text-gray-400 tracking-widest">
                                        <th className="px-6 py-4">Nombre / Operador</th>
                                        <th className="px-6 py-4">Email</th>
                                        <th className="px-6 py-4 text-center">Nivel de Privilegios</th>
                                        <th className="px-6 py-4 text-right w-44">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/60 text-sm">
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-zinc-950/40 transition-colors">
                                                <td className="px-6 py-4 font-bold text-white">
                                                    <div>{user.name}</div>
                                                    <div className="text-[9px] text-zinc-500 font-mono mt-0.5">UID_REF: {user.id}</div>
                                                </td>
                                                <td className="px-6 py-4 font-mono text-zinc-300 text-xs">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {/* Mostramos el badge leyendo directamente la columna string 'role' de cada usuario */}
                                                    <span 
                                                        className={`inline-block text-[9px] uppercase font-black px-2.5 py-1 rounded border tracking-wider mr-1 ${
                                                            user.role === 'admin'
                                                                ? 'text-cyan-400 bg-cyan-500/5 border-cyan-950'
                                                                : 'text-purple-400 bg-purple-500/5 border-purple-950'
                                                        }`}
                                                    >
                                                        {user.role === 'admin' ? 'Administrador' : 'Cliente'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => prepararEdicion(user)}
                                                        className="text-[10px] uppercase font-bold text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2 py-1 rounded transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => eliminarUsuario(user.id)}
                                                        className="text-[10px] uppercase font-bold text-rose-500 hover:text-rose-400 border border-rose-950 hover:border-rose-800 bg-rose-950/10 px-2 py-1 rounded transition-colors"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-zinc-500 uppercase tracking-wider text-xs font-bold">
                                                No hay usuarios registrados en el sistema.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}