import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { ChevronLeft, ChevronRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import { EventCard } from '../../student/components/calendar/EventCard'; // Reusing the EventCard from student components
import { Modal } from '@/shared/components/Modal'; // Import Modal component
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Helper component for the calendar grid (adapted from public calendar)
const CalendarGrid = ({ currentDate, events, onViewEventDetails }: { currentDate: Date, events: TeacherEvent[], onViewEventDetails: (event: TeacherEvent) => void }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Map events to a simpler date string for quick lookup
  const eventDates = new Set(events.map(e => e.fullDate));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-primary">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const dayNumber = day + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
          const hasEvent = eventDates.has(dateStr);
          const isToday = new Date().toDateString() === new Date(year, month, dayNumber).toDateString();

          const dayEvents = events.filter(e => e.fullDate === dateStr);

          return (
            <div
              key={dayNumber}
              className={`
                relative flex items-center justify-center h-12 rounded-full text-lg
                ${isToday ? 'bg-accent text-white' : ''}
                ${hasEvent && !isToday ? 'bg-primary/10 text-primary font-bold' : ''}
                ${hasEvent && isToday ? 'bg-accent text-white font-bold' : ''}
                ${!hasEvent && !isToday ? 'text-neutral-700' : ''}
                ${hasEvent ? 'cursor-pointer hover:bg-primary/20' : ''}
              `}
              onClick={hasEvent ? () => onViewEventDetails(dayEvents[0]) : undefined} // Open modal for the first event of the day
            >
              {dayNumber}
              {hasEvent && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface TeacherEvent {
  id: string;
  title: string;
  subtitle?: string;
  fullDate: string; // YYYY-MM-DD
  displayDate: string; // User-friendly date
  time?: string;
  location?: string;
  color: 'blue' | 'green' | 'red'; // For EventCard styling
  description?: string; // Added description for details modal
}

const mockTeacherEvents: TeacherEvent[] = [
  {
    id: 'te1',
    title: 'Clase: Matemáticas III (5to B)',
    subtitle: 'Aula 301',
    fullDate: '2025-11-15',
    displayDate: '15 Nov',
    time: '09:00 AM',
    location: 'Aula 301',
    color: 'blue',
    description: 'Clase regular de Matemáticas III para el 5to grado sección B.',
  },
  {
    id: 'te2',
    title: 'Reunión de Departamento',
    subtitle: 'Sala de Profesores',
    fullDate: '2025-11-15',
    displayDate: '15 Nov',
    time: '11:00 AM',
    location: 'Sala de Profesores',
    color: 'red',
    description: 'Reunión mensual del departamento de ciencias para coordinar actividades y evaluar el progreso.',
  },
  {
    id: 'te3',
    title: 'Clase: Historia Universal (4to A)',
    subtitle: 'Aula 205',
    fullDate: '2025-11-17',
    displayDate: '17 Nov',
    time: '10:00 AM',
    location: 'Aula 205',
    color: 'green',
    description: 'Clase de Historia Universal para el 4to grado sección A.',
  },
  {
    id: 'te4',
    title: 'Entrega de Calificaciones Parciales',
    fullDate: '2025-11-20',
    displayDate: '20 Nov',
    location: 'Secretaría Académica',
    color: 'red',
    description: 'Fecha límite para la entrega de las calificaciones parciales del ciclo.',
  },
  {
    id: 'te5',
    title: 'Clase: Matemáticas III (5to B)',
    subtitle: 'Aula 301',
    fullDate: '2025-11-22',
    displayDate: '22 Nov',
    time: '09:00 AM',
    location: 'Aula 301',
    color: 'blue',
    description: 'Clase regular de Matemáticas III para el 5to grado sección B.',
  },
];

export const CalendarioDocente = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-11-10')); // Start in November 2025 to show events
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventForDetails, setSelectedEventForDetails] = useState<TeacherEvent | null>(null);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const openEventDetailsModal = (event: TeacherEvent) => {
    setSelectedEventForDetails(event);
    setIsModalOpen(true);
  };

  const closeEventDetailsModal = () => {
    setSelectedEventForDetails(null);
    setIsModalOpen(false);
  };

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Filter events for the currently displayed month
  const eventsForMonth = mockTeacherEvents.filter(event => {
    const eventDate = new Date(event.fullDate);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  }) || [];

  const renderEventDetailsModalContent = () => {
    if (!selectedEventForDetails) return null;
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold text-primary">{selectedEventForDetails.title}</p>
        {selectedEventForDetails.subtitle && <p className="text-neutral-600">{selectedEventForDetails.subtitle}</p>}
        <div className="flex items-center gap-2 text-neutral-700">
          <CalendarDays className="w-5 h-5" />
          <span>{format(new Date(selectedEventForDetails.fullDate), 'dd MMMM yyyy', { locale: es })}</span>
        </div>
        {selectedEventForDetails.time && (
          <div className="flex items-center gap-2 text-neutral-700">
            <Clock className="w-5 h-5" />
            <span>{selectedEventForDetails.time}</span>
          </div>
        )}
        {selectedEventForDetails.location && (
          <div className="flex items-center gap-2 text-neutral-700">
            <MapPin className="w-5 h-5" />
            <span>{selectedEventForDetails.location}</span>
          </div>
          )}
        {selectedEventForDetails.description && (
          <div>
            <p className="font-semibold text-primary mt-4">Descripción:</p>
            <p className="text-neutral-700">{selectedEventForDetails.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Mi Calendario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Visual */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-neutral-200 transition-colors">
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            <h2 className="text-2xl font-bold text-primary capitalize">{monthName} {year}</h2>
            <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-neutral-200 transition-colors">
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
          </div>
          <CalendarGrid currentDate={currentDate} events={eventsForMonth} onViewEventDetails={openEventDetailsModal} />
        </div>

        {/* Upcoming Events List */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-primary mb-6">Próximos Eventos</h2>
          <div className="space-y-4">
            {eventsForMonth.length > 0 ? (
              eventsForMonth.map(event => (
                <EventCard key={event.id} event={{
                  id: event.id,
                  title: event.title,
                  subtitle: event.subtitle,
                  day: new Date(event.fullDate).getDate(),
                  month: new Date(event.fullDate).toLocaleString('es-ES', { month: 'short' }),
                  color: event.color,
                  time: event.time,
                }}
                onViewDetails={() => openEventDetailsModal(event)} // Pass the full event object
                />
              ))
            ) : (
              <p className="text-neutral-600 text-lg col-span-full text-center py-10">No hay eventos programados para este mes.</p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeEventDetailsModal}
        title={selectedEventForDetails?.title || 'Detalles del Evento'}
        hideFooter={true}
      >
        {renderEventDetailsModalContent()}
      </Modal>
    </Card>
  );
};