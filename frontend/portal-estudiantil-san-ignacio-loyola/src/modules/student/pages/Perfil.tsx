import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { User, Mail, Phone, Calendar, BookOpen, GraduationCap, KeyRound } from 'lucide-react';
import { Avatar } from '@/shared/components/Avatar'; // Assuming an Avatar component exists
import { Modal } from '@/shared/components/Modal'; // Import the Modal component

interface StudentProfile {
  name: string;
  studentCode: string;
  email: string;
  phone: string;
  dob: string; // Date of Birth
  grade: string;
  section: string;
  tutor: string;
  profilePicture: string; // URL or path to image
}

const mockStudentProfile: StudentProfile = {
  name: 'Carlos Mendoza',
  studentCode: '202300123',
  email: 'carlos.mendoza@sanignacio.edu.pe',
  phone: '+51 987 654 321',
  dob: '15/03/2008',
  grade: '5to de Secundaria',
  section: 'A',
  tutor: 'Prof. Ana García',
  profilePicture: 'https://picsum.photos/seed/student-carlos/200/200', // Placeholder image
};

export const Perfil = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'editProfile' | 'changePassword' | null>(null);

  const openModal = (type: typeof modalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const handleConfirmAction = () => {
    switch (modalType) {
      case 'editProfile':
        alert('Lógica para guardar cambios del perfil.');
        // Implement actual edit profile logic here
        break;
      case 'changePassword':
        alert('Lógica para cambiar la contraseña.');
        // Implement actual change password logic here
        break;
      default:
        break;
    }
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'editProfile':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nombre</label>
              <input type="text" defaultValue={mockStudentProfile.name} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Teléfono</label>
              <input type="text" defaultValue={mockStudentProfile.phone} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            {/* Add more editable fields */}
          </form>
        );
      case 'changePassword':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Contraseña Actual</label>
              <input type="password" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Nueva Contraseña</label>
              <input type="password" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Confirmar Nueva Contraseña</label>
              <input type="password" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
          </form>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'editProfile': return 'Editar Perfil';
      case 'changePassword': return 'Cambiar Contraseña';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Mi Perfil</h1>

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-neutral-200 mb-8">
        <Avatar src={mockStudentProfile.profilePicture} alt={mockStudentProfile.name} size="lg" />
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-primary">{mockStudentProfile.name}</h2>
          <p className="text-lg text-neutral-600">Código: {mockStudentProfile.studentCode}</p>
          <p className="text-md text-neutral-500">{mockStudentProfile.grade} - Sección "{mockStudentProfile.section}"</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Personal Information */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Información Personal</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-neutral-500">Correo Electrónico</p>
                <p className="text-md font-medium text-neutral-800">{mockStudentProfile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-neutral-500">Teléfono</p>
                <p className="text-md font-medium text-neutral-800">{mockStudentProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-neutral-500">Fecha de Nacimiento</p>
                <p className="text-md font-medium text-neutral-800">{mockStudentProfile.dob}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div>
          <h3 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Información Académica</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-neutral-500">Grado</p>
                <p className="text-md font-medium text-neutral-800">{mockStudentProfile.grade}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-neutral-500">Sección</p>
                <p className="text-md font-medium text-neutral-800">{mockStudentProfile.section}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm text-neutral-500">Tutor</p>
                <p className="text-md font-medium text-neutral-800">{mockStudentProfile.tutor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-10 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={() => openModal('editProfile')}
          className="bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <User className="w-5 h-5" />
          Editar Perfil
        </button>
        <button
          onClick={() => openModal('changePassword')}
          className="bg-secondary text-white py-3 px-6 rounded-full font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <KeyRound className="w-5 h-5" />
          Cambiar Contraseña
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        onConfirm={handleConfirmAction}
        onCancel={closeModal}
        confirmText="Guardar Cambios"
        cancelText="Cancelar"
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};
