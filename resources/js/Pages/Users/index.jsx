import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Index({ auth, users, roles }) {
    // Agregamos 'id', 'put' y 'reset' que faltaban en la desestructuración
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        id: '', // Importante para saber si editamos o creamos
        name: '',
        email: '',
        password: '',
        role_id: ''
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
            // Si hay un ID, usamos PUT para actualizar
            put(route('users.update', data.id), {
                onSuccess: () => {
                    reset();
                    alert('Usuario actualizado correctamente');
                },
            });
        } else {
            // Si no hay ID, usamos POST para crear
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
            role_id: user.roles[0]?.id || '', 
            password: '', 
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Usuarios</h2>}
        >
            <Head title="Usuarios" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border-b border-gray-200">
                        
                        {/* FORMULARIO DE USUARIO */}
                        <form onSubmit={submit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={data.id ? 'Dejar en blanco para no cambiar' : ''}
                                        required={!data.id}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Rol</label>
                                    <select
                                        value={data.role_id}
                                        onChange={e => setData('role_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    >
                                        <option value="">Selecciona un rol</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                                >
                                    {data.id ? 'Actualizar Usuario' : 'Crear Usuario'}
                                </button>

                                {data.id && (
                                    <button 
                                        type="button" 
                                        onClick={() => reset()} 
                                        className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-100 text-left text-xs font-bold uppercase text-gray-600">
                                        <th className="px-6 py-3">Nombre</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3 text-center">Roles</th>
                                        <th className="px-6 py-3 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {users.length > 0 ? (
                                        users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                                <td className="px-6 py-4 text-center">
                                                    {user.roles.map((role) => (
                                                        <span key={role.id} className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-sm mr-1">
                                                            {role.name}
                                                        </span>
                                                    ))}
                                                </td>
                                                <td className="px-6 py-4 text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => prepararEdicion(user)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => eliminarUsuario(user.id)}
                                                        className="text-red-600 hover:text-red-900 transition-colors"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                No hay usuarios registrados.
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