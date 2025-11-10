import { Card } from '@/shared/components/Card';
import { BookOpen, Award, CalendarDays, Mail } from 'lucide-react';
import { StatsCard } from '../student/components/home/StatsCard'; // Corrected import path
import { EventCard } from '../student/components/calendar/EventCard'; // Corrected import path
import { Link } from "react-router-dom"; // Import Link

// Mock Data for Parent Dashboard
interface ChildInfo {
  id: string;
  name: string;
  grade: string;
  section: string;
  profilePicture: string;
  latestGrade: number;
  pendingTasks: number;
  upcomingEvents: number;
}

interface ParentDashboardData {
  parentName: string;
  children: ChildInfo[];
  recentEvents: any[]; // Reusing Event type from student module
  // Add more data as needed for parent-specific views
}

const mockParentData: ParentDashboardData = {
  parentName: 'María Rodríguez',
  children: [
    {
      id: 'child1',
      name: 'Sofía Rodríguez',
      grade: '5to de Primaria',
      section: 'B',
      profilePicture: 'https://picsum.photos/seed/child1/100/100',
      latestGrade: 17,
      pendingTasks: 3,
      upcomingEvents: 2,
    },
    {
      id: 'child2',
      name: 'Pedro Rodríguez',
      grade: '2do de Secundaria',
      section: 'A',
      profilePicture: 'https://picsum.photos/seed/child2/100/100',
      latestGrade: 14,
      pendingTasks: 1,
      upcomingEvents: 1,
    },
  ],
  recentEvents: [
    {
      id: 'pe1',
      title: 'Reunión de Padres: 5to Primaria',
      subtitle: 'Auditorio Principal',
      day: 15,
      month: 'Nov',
      color: 'blue',
      time: '5:00 PM',
    },
    {
      id: 'pe2',
      title: 'Entrega de Boletas: 2do Secundaria',
      subtitle: 'Secretaría Académica',
      day: 20,
      month: 'Nov',
      color: 'green',
      time: '9:00 AM',
    },
  ],
};

export const DashboardPadreHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Bienvenido, {mockParentData.parentName}
        </h1>
        <p className="text-neutral-600">
          Aquí tienes un resumen de la actividad académica de tus hijos.
        </p>
      </Card>

      {/* Children Overview */}
      {mockParentData.children.map((child) => (
        <Card key={child.id} className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <img
              src={child.profilePicture}
              alt={child.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-primary">{child.name}</h2>
              <p className="text-neutral-600">{child.grade} - Sección "{child.section}"</p>
            </div>
          </div>

          {/* Child Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatsCard
              id={`child-${child.id}-latest-grade`}
              value={child.latestGrade.toFixed(1)}
              label="Última Nota"
              subtitle=""
              icon={Award as React.ElementType}
              color={child.latestGrade >= 14 ? 'green' : 'red'}
            />
            <StatsCard
              id={`child-${child.id}-pending-tasks`}
              value={child.pendingTasks.toString()}
              label="Tareas Pendientes"
              subtitle=""
              icon={BookOpen as React.ElementType}
              color={child.pendingTasks > 0 ? 'orange' : 'blue'}
            />
            <StatsCard
              id={`child-${child.id}-upcoming-events`}
              value={child.upcomingEvents.toString()}
              label="Eventos Próximos"
              subtitle=""
              icon={CalendarDays as React.ElementType}
              color={child.upcomingEvents > 0 ? 'purple' : 'blue'}
            />
          </div>

          {/* Quick Actions/Links for Child */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Link to="/dashboard-padre/calificaciones" className="bg-primary text-white py-2 px-4 rounded-full font-semibold text-sm hover:bg-opacity-90 transition">
              Ver Calificaciones de {child.name}
            </Link>
            <Link to="/dashboard-padre/tareas" className="bg-accent text-white py-2 px-4 rounded-full font-semibold text-sm hover:bg-opacity-90 transition">
              Ver Tareas de {child.name}
            </Link>
          </div>
        </Card>
      ))}

      {/* Recent Events for Parent */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-6">Eventos Recientes del Colegio</h2>
        <div className="space-y-4">
          {mockParentData.recentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Card>

      {/* Communication Section */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-6">Comunicación</h2>
        <p className="text-neutral-600 mb-4">
          Envía un mensaje a los profesores o a la administración del colegio.
        </p>
        <Link to="/dashboard-padre/comunicacion" className="bg-secondary text-white py-2 px-4 rounded-full font-semibold text-sm hover:bg-opacity-90 transition flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Contactar
        </Link>
      </Card>
    </div>
  );
};
