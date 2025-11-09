import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { CalendarDays, Clock, MapPin, Edit, Trash2, PlusCircle, Search } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Modal } from '@/shared/components/Modal'; // Import the Modal component

interface EventData {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  location: string;
  description: string;
}

const mockEvents: EventData[] = [
  {
    id: 'e1',
    title: 'Reunión de Padres de Familia',
    date: '2025-11-20',
    time: '18:00',
    location: 'Auditorio Principal',
    description: 'Reunión informativa sobre el progreso académico del primer trimestre.',
  },
  {
    id: 'e2',
    title: 'Día de la Ciencia y Tecnología',
    date: '2025-12-05',
    time: '09:00',
    location: 'Patio Central',
    description: 'Exposición de proyectos científicos y tecnológicos de los estudiantes.',
  },
  {
    id: 'e3',
    title: 'Concierto de Navidad',
    date: '2025-12-18',
    time: '19:30',
    location: 'Teatro del Colegio',
    description: 'Presentación musical a cargo de la orquesta y coro del colegio.',
  },
  {
    id: 'e4',
    title: 'Vacaciones de Invierno',
    date: '2026-01-01',
    time: 'Todo el día',
    location: 'N/A',
    description: 'Inicio del periodo vacacional de invierno.',
  },
];

export const GestionarEventos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState(''); // YYYY-MM-DD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete' | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = filterDate === '' || event.date === filterDate;
    return matchesSearch && matchesDate;
  });

  const openModal = (type: typeof modalType, event?: EventData) => {
    setModalType(type);
    setSelectedEvent(event || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedEvent(null);
  };

  const handleConfirmAction = () => {
    if (!selectedEvent && modalType !== 'create') {
      alert('Error: No event selected for this action.');
      return;
    }

    switch (modalType) {
      case 'create':
        alert('Lógica para crear nuevo evento.');
        // Implement actual create logic here
        break;
      case 'edit':
        alert(`Lógica para editar evento: ${selectedEvent?.title}`);
        // Implement actual edit logic here
        break;
      case 'delete':
        alert(`Lógica para eliminar evento: ${selectedEvent?.title}`);
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
              <label className="block text-sm font-medium text-neutral-700">Título</label>
              <input type="text" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Fecha</label>
              <input type="date" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Hora</label>
              <input type="time" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Lugar</label>
              <input type="text" className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Descripción</label>
              <textarea rows={3} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"></textarea>
            </div>
          </form>
        );
      case 'edit':
        return (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700">Título</label>
              <input type="text" defaultValue={selectedEvent?.title} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Fecha</label>
              <input type="date" defaultValue={selectedEvent?.date} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Hora</label>
              <input type="time" defaultValue={selectedEvent?.time} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Lugar</label>
              <input type="text" defaultValue={selectedEvent?.location} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700">Descripción</label>
              <textarea defaultValue={selectedEvent?.description} rows={3} className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"></textarea>
            </div>
          </form>
        );
      case 'delete':
        return (
          <p>¿Estás seguro de que quieres eliminar el evento **{selectedEvent?.title}**?</p>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'create': return 'Crear Nuevo Evento';
      case 'edit': return `Editar Evento: ${selectedEvent?.title}`;
      case 'delete': return 'Confirmar Eliminación';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Eventos</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o lugar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            onClick={() => openModal('create')}
            className="bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
          >
            <PlusCircle className="w-5 h-5" />
            Nuevo Evento
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Título
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Hora
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Lugar
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-primary" /> {event.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    {format(new Date(event.date), 'dd MMMM yyyy', { locale: es })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <Clock className="w-4 h-4 inline-block mr-2 text-accent" />{event.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                    <MapPin className="w-4 h-4 inline-block mr-2 text-accent" />{event.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <div className="flex items-center gap-3">
                      <button onClick={() => openModal('edit', event)} className="text-indigo-600 hover:text-indigo-900 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => openModal('delete', event)} className="text-red-600 hover:text-red-900 transition">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-neutral-600">No se encontraron eventos.</td>
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