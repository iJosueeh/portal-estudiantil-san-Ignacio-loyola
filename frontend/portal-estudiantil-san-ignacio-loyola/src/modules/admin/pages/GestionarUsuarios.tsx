import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { User, Mail, KeyRound, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import useUsers from '@/shared/hooks/useUsers';
import type { UserDto, UserCreationDto, UserUpdateDto, UserRole } from '@/shared/types/user.types';
import { toast } from 'react-toastify'; // Import toast

export const GestionarUsuarios = () => {
  const {
    users,
    isLoadingUsers,
    usersError,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    updateUserPasswordMutation,
  } = useUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | UserRole>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | 'resetPassword' | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formRole, setFormRole] = useState<UserRole>('STUDENT');
  const [formIsActive, setFormIsActive] = useState(true);
  const [formPassword, setFormPassword] = useState('');

  const filteredUsers = (users || []).filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'STUDENT': return 'bg-blue-100 text-blue-800';
      case 'TEACHER': return 'bg-green-100 text-green-800';
      case 'PARENT': return 'bg-purple-100 text-purple-800';
      case 'ADMIN': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const openModal = (type: typeof modalType, user?: UserDto) => {
    setModalType(type);
    setSelectedUser(user || null);
    if (user) {
      setFormFirstName(user.firstName);
      setFormLastName(user.lastName);
      setFormUsername(user.username);
      setFormRole(user.role);
      setFormIsActive(user.isActive);
      setFormPassword('');
    } else {
      setFormFirstName('');
      setFormLastName('');
      setFormUsername('');
      setFormRole('STUDENT');
      setFormIsActive(true);
      setFormPassword('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
    setFormFirstName('');
    setFormLastName('');
    setFormUsername('');
    setFormRole('STUDENT');
    setFormIsActive(true);
    setFormPassword('');
  };

  const handleConfirmAction = async () => {
    if (!selectedUser && modalType !== 'create') {
      toast.error('Error: No user selected for this action.');
      return;
    }

    try {
      switch (modalType) {
        case 'create':
          { const newUser: UserCreationDto = {
            firstName: formFirstName,
            lastName: formLastName,
            username: formUsername,
            email: formUsername,
            role: formRole,
            isActive: formIsActive,
            password: formPassword,
          };
          await createUserMutation.mutateAsync(newUser);
          toast.success('Usuario creado exitosamente.');
          break; }
        case 'edit':
          if (selectedUser?.id) {
            const updatedUser: UserUpdateDto = {
              id: selectedUser.id,
              firstName: formFirstName,
              lastName: formLastName,
              username: formUsername,
              role: formRole,
              isActive: formIsActive,
            };
            await updateUserMutation.mutateAsync({ id: selectedUser.id, user: updatedUser });
            toast.success('Usuario actualizado exitosamente.');
          }
          break;
        case 'delete':
          if (selectedUser?.id) {
            await deleteUserMutation.mutateAsync(selectedUser.id);
            toast.success('Usuario eliminado exitosamente.');
          }
          break;
        case 'resetPassword':
          if (selectedUser?.id && formPassword) {
            await updateUserPasswordMutation.mutateAsync({ id: selectedUser.id, newPassword: formPassword });
            toast.success('Contraseña restablecida exitosamente.');
          } else {
            toast.error('Por favor, introduce una nueva contraseña.');
            return;
          }
          break;
        default:
          break;
      }
      closeModal();
    } catch (e: unknown) {
      toast.error(`Error: ${ (e as Error).message || 'Ocurrió un error.'}`);
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'create':
      case 'edit':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nombre</label>
              <input type="text" value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Apellido</label>
              <input type="text" value={formLastName} onChange={(e) => setFormLastName(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Email (Usuario)</label>
              <input type="email" value={formUsername} onChange={(e) => setFormUsername(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Rol</label>
              <select value={formRole} onChange={(e) => setFormRole(e.target.value as UserRole)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50">
                <option value="STUDENT">Estudiante</option>
                <option value="TEACHER">Docente</option>
                <option value="PARENT">Padre</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
            {modalType === 'create' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700">Contraseña</label>
                <input type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
              </div>
            )}
            {modalType === 'edit' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700">Estado</label>
                <select value={formIsActive ? 'active' : 'inactive'} onChange={(e) => setFormIsActive(e.target.value === 'active')} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50">
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            )}
          </form>
        );
      case 'delete':
        return (
          <p>¿Estás seguro de que quieres eliminar al usuario **{selectedUser?.firstName} {selectedUser?.lastName}**?</p>
        );
      case 'resetPassword':
        return (
          <form className="space-y-4">
            <p>¿Estás seguro de que quieres restablecer la contraseña de **{selectedUser?.firstName} {selectedUser?.lastName}**?</p>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nueva Contraseña</label>
              <input type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create': return 'Crear Nuevo Usuario';
      case 'edit': return `Editar Usuario: ${selectedUser?.firstName} ${selectedUser?.lastName}`;
      case 'delete': return 'Confirmar Eliminación';
      case 'resetPassword': return 'Restablecer Contraseña';
      default: return '';
    }
  };

  if (isLoadingUsers) {
    return <Card className="p-6 text-center">Cargando usuarios...</Card>;
  }

  if (usersError) {
    return <Card className="p-6 text-center text-red-500">Error: {usersError.message}</Card>;
  }

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Usuarios</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as 'all' | UserRole)}
            className="px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Todos los Roles</option>
            <option value="STUDENT">Estudiante</option>
            <option value="TEACHER">Docente</option>
            <option value="PARENT">Padre</option>
            <option value="ADMIN">Administrador</option>
          </select>
          <button
            onClick={() => openModal('create')}
            className="bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre Completo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email (Usuario)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Rol
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <Mail className="w-4 h-4 inline-block mr-2 text-accent" />{user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openModal('edit', user)} className="text-indigo-600 hover:text-indigo-900 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => openModal('delete', user)} className="text-red-600 hover:text-red-900 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button onClick={() => openModal('resetPassword', user)} className="text-neutral-600 hover:text-neutral-900 transition">
                        <KeyRound className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-600">No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
        confirmText={modalType === 'delete' ? 'Eliminar' : modalType === 'resetPassword' ? 'Restablecer' : 'Guardar'}
        cancelText="Cancelar"
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};