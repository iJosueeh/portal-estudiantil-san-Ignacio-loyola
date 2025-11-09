import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { User, Mail, KeyRound, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { Modal } from '@/shared/components/Modal'; // Import the Modal component

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  status: 'active' | 'inactive';
}

const mockUsers: UserData[] = [
  { id: 'u1', name: 'Sofía Rodríguez', email: 'sofia.r@sanignacio.edu.pe', role: 'student', status: 'active' },
  { id: 'u2', name: 'Pedro Gómez', email: 'pedro.g@sanignacio.edu.pe', role: 'student', status: 'active' },
  { id: 'u3', name: 'Prof. Ana García', email: 'ana.g@sanignacio.edu.pe', role: 'teacher', status: 'active' },
  { id: 'u4', name: 'Prof. Carlos Pérez', email: 'carlos.p@sanignacio.edu.pe', role: 'teacher', status: 'active' },
  { id: 'u5', name: 'María Rodríguez', email: 'maria.r@example.com', role: 'parent', status: 'active' },
  { id: 'u6', name: 'Juan Pérez (Admin)', email: 'juan.p@admin.com', role: 'admin', status: 'active' },
  { id: 'u7', name: 'Laura Torres', email: 'laura.t@sanignacio.edu.pe', role: 'student', status: 'inactive' },
];

export const GestionarUsuarios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | UserData['role']>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | 'resetPassword' | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: UserData['role']) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'teacher': return 'bg-green-100 text-green-800';
      case 'parent': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-neutral-100 text-neutral-800';
    }
  };

  const openModal = (type: typeof modalType, user?: UserData) => {
    setModalType(type);
    setSelectedUser(user || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedUser(null);
  };

  const handleConfirmAction = () => {
    if (!selectedUser && modalType !== 'create') {
      alert('Error: No user selected for this action.');
      return;
    }

    switch (modalType) {
      case 'create':
        alert('Lógica para crear nuevo usuario.');
        // Implement actual create logic here
        break;
      case 'edit':
        alert(`Lógica para editar usuario: ${selectedUser?.name}`);
        // Implement actual edit logic here
        break;
      case 'delete':
        alert(`Lógica para eliminar usuario: ${selectedUser?.name}`);
        // Implement actual delete logic here
        break;
      case 'resetPassword':
        alert(`Lógica para restablecer contraseña de: ${selectedUser?.name}`);
        // Implement actual password reset logic here
        break;
      default:
        break;
    }
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'create':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nombre</label>
              <input type="text" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Email</label>
              <input type="email" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Rol</label>
              <select className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50">
                <option>student</option>
                <option>teacher</option>
                <option>parent</option>
                <option>admin</option>
              </select>
            </div>
          </form>
        );
      case 'edit':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nombre</label>
              <input type="text" defaultValue={selectedUser?.name} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Email</label>
              <input type="email" defaultValue={selectedUser?.email} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Rol</label>
              <select defaultValue={selectedUser?.role} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50">
                <option>student</option>
                <option>teacher</option>
                <option>parent</option>
                <option>admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Estado</label>
              <select defaultValue={selectedUser?.status} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50">
                <option>active</option>
                <option>inactive</option>
              </select>
            </div>
          </form>
        );
      case 'delete':
        return (
          <p>¿Estás seguro de que quieres eliminar al usuario **{selectedUser?.name}**?</p>
        );
      case 'resetPassword':
        return (
          <p>¿Estás seguro de que quieres restablecer la contraseña de **{selectedUser?.name}**?</p>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create': return 'Crear Nuevo Usuario';
      case 'edit': return `Editar Usuario: ${selectedUser?.name}`;
      case 'delete': return 'Confirmar Eliminación';
      case 'resetPassword': return 'Restablecer Contraseña';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Usuarios</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as 'all' | UserData['role'])}
            className="px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Todos los Roles</option>
            <option value="student">Estudiante</option>
            <option value="teacher">Docente</option>
            <option value="parent">Padre</option>
            <option value="admin">Administrador</option>
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
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
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
                    <User className="w-4 h-4 text-primary" /> {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <Mail className="w-4 h-4 inline-block mr-2 text-accent" />{user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
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