import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { Settings, Calendar, Bell, Save, Edit, CheckCircle } from 'lucide-react'; // Added CheckCircle
import { Modal } from '@/shared/components/Modal'; // Import the Modal component

interface SystemSettings {
  academicYear: string;
  enrollmentStartDate: string; // YYYY-MM-DD
  enrollmentEndDate: string; // YYYY-MM-DD
  notificationsEnabled: boolean;
  defaultLanguage: string;
}

const mockSettings: SystemSettings = {
  academicYear: '2025-2026',
  enrollmentStartDate: '2025-12-01',
  enrollmentEndDate: '2026-01-15',
  notificationsEnabled: true,
  defaultLanguage: 'es',
};

export const Configuracion = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'confirmSave' | null>(null);
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (type: typeof modalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveClick = () => {
    openModal('confirmSave', '¿Estás seguro de guardar los cambios en la configuración?');
  };

  const handleConfirmSave = () => {
    // In a real app, send updated settings to backend
    console.log('Settings saved:', settings);
    setIsEditing(false);
    closeModal(); // Close confirmation modal
    openModal('success', 'Configuración guardada con éxito!'); // Open success modal
  };

  const renderModalContent = () => {
    switch (modalType) {
      case 'confirmSave':
        return <p className="text-lg text-neutral-700">{modalMessage}</p>;
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg text-neutral-700">{modalMessage}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'confirmSave': return 'Confirmar Guardar';
      case 'success': return 'Éxito';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Configuración del Sistema</h1>

      <div className="space-y-8">
        {/* General Settings */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2 flex items-center gap-2">
            <Settings className="w-6 h-6" /> Ajustes Generales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="academicYear" className="block text-sm font-medium text-neutral-700 mb-1">
                Año Académico:
              </label>
              <input
                type="text"
                id="academicYear"
                name="academicYear"
                value={settings.academicYear}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${isEditing ? 'bg-neutral-100 border-2 border-transparent' : 'bg-neutral-50 border border-neutral-200'}`}
              />
            </div>
            <div>
              <label htmlFor="defaultLanguage" className="block text-sm font-medium text-neutral-700 mb-1">
                Idioma por Defecto:
              </label>
              <select
                id="defaultLanguage"
                name="defaultLanguage"
                value={settings.defaultLanguage}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${isEditing ? 'bg-neutral-100 border-2 border-transparent' : 'bg-neutral-50 border border-neutral-200'}`}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enrollment Settings */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2 flex items-center gap-2">
            <Calendar className="w-6 h-6" /> Periodo de Matrícula
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="enrollmentStartDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Fecha de Inicio:
              </label>
              <input
                type="date"
                id="enrollmentStartDate"
                name="enrollmentStartDate"
                value={settings.enrollmentStartDate}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${isEditing ? 'bg-neutral-100 border-2 border-transparent' : 'bg-neutral-50 border border-neutral-200'}`}
              />
            </div>
            <div>
              <label htmlFor="enrollmentEndDate" className="block text-sm font-medium text-neutral-700 mb-1">
                Fecha de Fin:
              </label>
              <input
                type="date"
                id="enrollmentEndDate"
                name="enrollmentEndDate"
                value={settings.enrollmentEndDate}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${isEditing ? 'bg-neutral-100 border-2 border-transparent' : 'bg-neutral-50 border border-neutral-200'}`}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2 flex items-center gap-2">
            <Bell className="w-6 h-6" /> Notificaciones
          </h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              checked={settings.notificationsEnabled}
              onChange={handleChange}
              disabled={!isEditing}
              className="h-5 w-5 text-accent rounded focus:ring-accent"
            />
            <label htmlFor="notificationsEnabled" className="text-sm font-medium text-neutral-700">
              Habilitar Notificaciones del Sistema
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="bg-green-600 text-white py-2 px-5 rounded-full font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Guardar Cambios
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white py-2 px-5 rounded-full font-semibold hover:bg-opacity-90 transition flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Editar Configuración
            </button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        onConfirm={modalType === 'confirmSave' ? handleConfirmSave : closeModal}
        onCancel={closeModal}
        confirmText={modalType === 'confirmSave' ? 'Guardar' : 'Aceptar'}
        cancelText="Cancelar"
        hideFooter={modalType === 'success'} // Hide footer for success modal
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};
