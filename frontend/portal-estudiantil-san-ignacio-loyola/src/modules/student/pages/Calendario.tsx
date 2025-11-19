import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EventCard } from '../components/calendar/EventCard'; // Reusing the EventCard from student components

// Helper component for the calendar grid (adapted from public calendar)
const CalendarGrid = ({ currentDate, events }: { currentDate: Date, events: StudentEvent[] }) => {
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

          return (
            <div
              key={dayNumber}
              className={`
                flex items-center justify-center h-12 rounded-full text-lg
                ${isToday ? 'bg-accent text-white' : ''}
                ${hasEvent && !isToday ? 'bg-primary/10 text-primary font-bold' : ''}
                ${hasEvent && isToday ? 'bg-accent text-white font-bold' : ''}
                ${!hasEvent && !isToday ? 'text-neutral-700' : ''}
              `}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface StudentEvent {
  id: string;
  title: string;
  subtitle?: string;
  fullDate: string; // YYYY-MM-DD
  displayDate: string; // User-friendly date
  time?: string;
  location?: string;
  color: 'blue' | 'green' | 'red'; // For EventCard styling
}

const mockStudentEvents: StudentEvent[] = [
  {
    id: 'se1',
    title: 'Entrega de Tarea: Ensayo de Historia',
    subtitle: 'Historia Universal',
    fullDate: '2025-11-15',
    displayDate: '15 Nov',
    time: '23:59',
    color: 'red',
  },
  {
    id: 'se2',
    title: 'Examen Parcial: Matemáticas III',
    subtitle: 'Aula 301',
    fullDate: '2025-11-20',
    displayDate: '20 Nov',
    time: '10:00 AM',
    color: 'blue',
  },
  {
    id: 'se3',
    title: 'Clase de Refuerzo: Química',
    subtitle: 'Laboratorio 1',
    fullDate: '2025-11-22',
    displayDate: '22 Nov',
    time: '4:00 PM',
    color: 'green',
  },
  {
    id: 'se4',
    title: 'Feriado: Día de la Independencia',
    fullDate: '2025-11-28',
    displayDate: '28 Nov',
    time: 'Todo el día',
    color: 'red',
  },
  {
    id: 'se5',
    title: 'Reunión con Tutor',
    subtitle: 'Oficina del Tutor',
    fullDate: '2025-12-05',
    displayDate: '05 Dic',
    time: '3:00 PM',
    color: 'blue',
  },
];

export const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-11-10')); // Start in November 2025 to show events

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // Define month here

  // Filter events for the currently displayed month
  const eventsForMonth = mockStudentEvents.filter(event => {
    const eventDate = new Date(event.fullDate);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });

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
          <CalendarGrid currentDate={currentDate} events={eventsForMonth} />
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
                  day: String(new Date(event.fullDate).getDate()),
                  month: new Date(event.fullDate).toLocaleString('es-ES', { month: 'short' }),
                  color: event.color,
                  time: event.time,
                }} />
              ))
            ) : (
              <p className="text-neutral-600">No hay eventos programados para este mes.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
