import React, { useState } from 'react';
import { CalendarDays, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface AcademicEvent {
  id: string;
  title: string;
  description: string;
  fullDate: string; // YYYY-MM-DD format
  displayDate: string; // User-friendly date
  time: string;
  location: string;
  category: 'Académico' | 'Cultural' | 'Deportivo' | 'Social' | 'Feriado';
  imageUrl: string;
}

const mockEvents: AcademicEvent[] = [
  {
    id: '1',
    title: 'Inicio de Clases - Año Escolar 2025',
    description: 'Primer día de clases para todos los niveles educativos. ¡Bienvenidos!',
    fullDate: '2025-03-03',
    displayDate: 'Lunes, 3 de Marzo',
    time: '8:00 AM',
    location: 'Todas las aulas',
    category: 'Académico',
    imageUrl: 'https://picsum.photos/seed/evento1/400/200',
  },
  {
    id: '2',
    title: 'Reunión de Padres de Familia - Nivel Primaria',
    description: 'Reunión informativa sobre el plan de estudios y actividades del primer trimestre.',
    fullDate: '2025-03-14',
    displayDate: 'Viernes, 14 de Marzo',
    time: '5:00 PM',
    location: 'Auditorio Principal',
    category: 'Académico',
    imageUrl: 'https://picsum.photos/seed/evento2/400/200',
  },
  {
    id: '3',
    title: 'Festival de Danzas Folclóricas',
    description: 'Celebración de nuestra cultura a través de la danza. ¡No te lo pierdas!',
    fullDate: '2025-03-22',
    displayDate: 'Sábado, 22 de Marzo',
    time: '6:00 PM',
    location: 'Patio Central',
    category: 'Cultural',
    imageUrl: 'https://picsum.photos/seed/evento3/400/200',
  },
  {
    id: '4',
    title: 'Día del Logro - Presentación de Proyectos',
    description: 'Exposición de los proyectos más destacados realizados por nuestros estudiantes.',
    fullDate: '2025-04-10',
    displayDate: 'Jueves, 10 de Abril',
    time: '9:00 AM',
    location: 'Gimnasio Escolar',
    category: 'Académico',
    imageUrl: 'https://picsum.photos/seed/evento4/400/200',
  },
  {
    id: '5',
    title: 'Campaña de Donación de Libros',
    description: 'Contribuye a nuestra biblioteca escolar donando libros en buen estado.',
    fullDate: '2025-05-01', // Example for multi-day event, we'll just mark the start
    displayDate: 'Del 1 al 5 de Mayo',
    time: 'Todo el día',
    location: 'Biblioteca',
    category: 'Social',
    imageUrl: 'https://picsum.photos/seed/evento5/400/200',
  },
  {
    id: '6',
    title: 'Olimpiadas Deportivas Inter-aulas',
    description: 'Una semana de competencia sana y espíritu deportivo entre todas las secciones.',
    fullDate: '2025-05-19', // Example for multi-day event
    displayDate: 'Del 19 al 23 de Mayo',
    time: 'Todo el día',
    location: 'Complejo Deportivo',
    category: 'Deportivo',
    imageUrl: 'https://picsum.photos/seed/evento6/400/200',
  },
];

const CalendarGrid = ({ currentDate, events }: { currentDate: Date, events: AcademicEvent[] }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const eventDates = events.map(e => e.fullDate);

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
          const hasEvent = eventDates.includes(dateStr);
          const isToday = new Date().toDateString() === new Date(year, month, dayNumber).toDateString();

          return (
            <div
              key={dayNumber}
              className={`
                flex items-center justify-center h-12 rounded-full text-lg
                ${isToday ? 'bg-accent text-white' : ''}
                ${hasEvent ? 'relative' : ''}
              `}
            >
              {dayNumber}
              {hasEvent && !isToday && <div className="absolute bottom-1 w-2 h-2 bg-secondary rounded-full" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2025-03-15')); // Start in March 2025 to show events

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Calendario Académico</h1>
        <p className="text-lg text-neutral-600 mb-10 text-center max-w-2xl mx-auto">
          Consulta las fechas importantes, eventos y actividades programadas para el año escolar.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Calendar Visual */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-neutral-200 transition-colors">
                <ChevronLeft className="w-6 h-6 text-primary" />
              </button>
              <h2 className="text-2xl font-bold text-primary capitalize">{monthName} {year}</h2>
              <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-neutral-200 transition-colors">
                <ChevronRight className="w-6 h-6 text-primary" />
              </button>
            </div>
            <CalendarGrid currentDate={currentDate} events={mockEvents} />
          </div>

          {/* Events List */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-primary mb-6">Próximos Eventos</h2>
            <div className="space-y-8">
              {mockEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden md:flex group">
                  <div className="md:w-1/3 overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500 mb-3">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        <span>{event.displayDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold
                        ${event.category === 'Académico' ? 'bg-blue-100 text-blue-800' : ''}
                        ${event.category === 'Cultural' ? 'bg-purple-100 text-purple-800' : ''}
                        ${event.category === 'Deportivo' ? 'bg-green-100 text-green-800' : ''}
                        ${event.category === 'Social' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${event.category === 'Feriado' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {event.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">{event.title}</h2>
                    <p className="text-neutral-700 text-base mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-neutral-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};