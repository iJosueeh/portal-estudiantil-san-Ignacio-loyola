import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { BookOpen, User, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { Modal } from '@/shared/components/Modal'; // Import the Modal component

interface CourseData {
  id: string;
  name: string;
  teacher: string;
  studentsCount: number;
  status: 'active' | 'inactive';
}

const mockCourses: CourseData[] = [
  { id: 'c1', name: 'Matemáticas III', teacher: 'Prof. Ana García', studentsCount: 30, status: 'active' },
  { id: 'c2', name: 'Historia Universal', teacher: 'Prof. Carlos Pérez', studentsCount: 28, status: 'active' },
  { id: 'c3', name: 'Literatura Española', teacher: 'Prof. Sofía Rojas', studentsCount: 25, status: 'active' },
  { id: 'c4', name: 'Ciencias Naturales', teacher: 'Dra. Laura Montes', studentsCount: 27, status: 'inactive' },
  { id: 'c5', name: 'Inglés Avanzado', teacher: 'Prof. David Smith', studentsCount: 22, status: 'active' },
];

export const GestionarCursos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | CourseData['status']>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: CourseData['status']) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const openModal = (type: typeof modalType, course?: CourseData) => {
    setModalType(type);
    setSelectedCourse(course || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedCourse(null);
  };

  const handleConfirmAction = () => {
    if (!selectedCourse && modalType !== 'create') {
      alert('Error: No course selected for this action.');
      return;
    }

    switch (modalType) {
      case 'create':
        alert('Lógica para crear nuevo curso.');
        // Implement actual create logic here
        break;
      case 'edit':
        alert(`Lógica para editar curso: ${selectedCourse?.name}`);
        // Implement actual edit logic here
        break;
      case 'delete':
        alert(`Lógica para eliminar curso: ${selectedCourse?.name}`);
        // Implement actual delete logic here
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
              <label className="block text-sm font-medium text-neutral-700">Nombre del Curso</label>
              <input type="text" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Docente</label>
              <input type="text" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Estado</label>
              <select className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50">
                <option>active</option>
                <option>inactive</option>
              </select>
            </div>
          </form>
        );
      case 'edit':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nombre del Curso</label>
              <input type="text" defaultValue={selectedCourse?.name} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Docente</label>
              <input type="text" defaultValue={selectedCourse?.teacher} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Estado</label>
              <select defaultValue={selectedCourse?.status} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-opacity-50">
                <option>active</option>
                <option>inactive</option>
              </select>
            </div>
          </form>
        );
      case 'delete':
        return (
          <p>¿Estás seguro de que quieres eliminar el curso **{selectedCourse?.name}**?</p>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create': return 'Crear Nuevo Curso';
      case 'edit': return `Editar Curso: ${selectedCourse?.name}`;
      case 'delete': return 'Confirmar Eliminación';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Cursos</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre o docente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | CourseData['status'])}
            className="px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Todos los Estados</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
          <button
            onClick={() => openModal('create')}
            className="bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Curso
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nombre del Curso
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Docente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Estudiantes
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
            {filteredCourses.length > 0 ? (
              filteredCourses.map(course => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" /> {course.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <User className="w-4 h-4 inline-block mr-2 text-accent" />{course.teacher}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    {course.studentsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {course.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openModal('edit', course)} className="text-indigo-600 hover:text-indigo-900 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => openModal('delete', course)} className="text-red-600 hover:text-red-900 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-600">No se encontraron cursos.</td>
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