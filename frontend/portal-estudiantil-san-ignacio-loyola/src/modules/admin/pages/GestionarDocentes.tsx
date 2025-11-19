import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { User, Mail, Briefcase, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { Modal } from '@/shared/components/Modal';
import useTeachers from '@/shared/hooks/useTeachers'; // Import the custom hook
import type { TeacherDto, TeacherCreationDto, TeacherUpdateDto } from '@/shared/types/teacher.types';

export const GestionarDocentes = () => {
  const {
    teachers,
    isLoadingTeachers,
    teachersError,
    createTeacherMutation,
    updateTeacherMutation,
    deleteTeacherMutation,
  } = useTeachers();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherDto | null>(null);

  // Form states for create/edit modals
  const [formUserId, setFormUserId] = useState<number | ''>('');
  const [formEmployeeId, setFormEmployeeId] = useState('');
  const [formDepartment, setFormDepartment] = useState('');
  const [formProfilePictureUrl, setFormProfilePictureUrl] = useState('');

  const filteredTeachers = (teachers || []).filter(teacher => {
    const matchesSearch = teacher.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          teacher.department?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const openModal = (type: typeof modalType, teacher?: TeacherDto) => {
    setModalType(type);
    setSelectedTeacher(teacher || null);
    if (teacher) {
      setFormUserId(teacher.userId);
      setFormEmployeeId(teacher.employeeId);
      setFormDepartment(teacher.department || '');
      setFormProfilePictureUrl(teacher.profilePictureUrl || '');
    } else {
      // Reset form for creation
      setFormUserId('');
      setFormEmployeeId('');
      setFormDepartment('');
      setFormProfilePictureUrl('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedTeacher(null);
    // Clear form states
    setFormUserId('');
    setFormEmployeeId('');
    setFormDepartment('');
    setFormProfilePictureUrl('');
  };

  const handleConfirmAction = async () => {
    if (!selectedTeacher && modalType !== 'create') {
      alert('Error: No teacher selected for this action.');
      return;
    }

    try {
      switch (modalType) {
        case 'create':
          if (formUserId === '' || formEmployeeId === '') {
            alert('User ID and Employee ID are required.');
            return;
          }
          const newTeacher: TeacherCreationDto = {
            userId: Number(formUserId),
            employeeId: formEmployeeId,
            department: formDepartment,
            profilePictureUrl: formProfilePictureUrl,
          };
          await createTeacherMutation.mutateAsync(newTeacher);
          alert('Docente creado exitosamente.');
          break;
        case 'edit':
          if (selectedTeacher?.id) {
            const updatedTeacher: TeacherUpdateDto = {
              id: selectedTeacher.id,
              userId: Number(formUserId),
              employeeId: formEmployeeId,
              department: formDepartment,
              profilePictureUrl: formProfilePictureUrl,
            };
            await updateTeacherMutation.mutateAsync({ id: selectedTeacher.id, teacher: updatedTeacher });
            alert('Docente actualizado exitosamente.');
          }
          break;
        case 'delete':
          if (selectedTeacher?.id) {
            await deleteTeacherMutation.mutateAsync(selectedTeacher.id);
            alert('Docente eliminado exitosamente.');
          }
          break;
        default:
          break;
      }
      closeModal();
    } catch (e: any) {
      alert(`Error: ${e.message || 'Ocurrió un error.'}`);
    }
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'create':
      case 'edit':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">ID de Usuario Asociado</label>
              <input type="number" value={formUserId} onChange={(e) => setFormUserId(Number(e.target.value))} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">ID de Empleado</label>
              <input type="text" value={formEmployeeId} onChange={(e) => setFormEmployeeId(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Departamento</label>
              <input type="text" value={formDepartment} onChange={(e) => setFormDepartment(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">URL de Foto de Perfil</label>
              <input type="text" value={formProfilePictureUrl} onChange={(e) => setFormProfilePictureUrl(e.target.value)} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
          </form>
        );
      case 'delete':
        return (
          <p>¿Estás seguro de que quieres eliminar al docente con ID de Empleado **{selectedTeacher?.employeeId}**?</p>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create': return 'Crear Nuevo Docente';
      case 'edit': return `Editar Docente: ${selectedTeacher?.employeeId}`;
      case 'delete': return 'Confirmar Eliminación';
      default: return '';
    }
  };

  if (isLoadingTeachers) {
    return <Card className="p-6 text-center">Cargando docentes...</Card>;
  }

  if (teachersError) {
    return <Card className="p-6 text-center text-red-500">Error: {teachersError.message}</Card>;
  }

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Docentes</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por ID de Empleado o Departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={() => openModal('create')}
            className="bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Docente
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID de Usuario
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID de Empleado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Departamento
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map(teacher => (
                <tr key={teacher.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {teacher.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <User className="w-4 h-4 inline-block mr-2 text-primary" /> {teacher.userId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <Mail className="w-4 h-4 inline-block mr-2 text-accent" />{teacher.employeeId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <Briefcase className="w-4 h-4 inline-block mr-2 text-accent" />{teacher.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openModal('edit', teacher)} className="text-indigo-600 hover:text-indigo-900 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => openModal('delete', teacher)} className="text-red-600 hover:text-red-900 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-600">No se encontraron docentes.</td>
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
        confirmText={modalType === 'delete' ? 'Eliminar' : 'Guardar'}
        cancelText="Cancelar"
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};
