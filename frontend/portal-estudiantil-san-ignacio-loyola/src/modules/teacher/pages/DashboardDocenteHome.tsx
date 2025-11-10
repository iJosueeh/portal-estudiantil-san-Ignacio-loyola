import { Card } from '@/shared/components/Card';
import { BookOpen, Mail, Users, Clock } from 'lucide-react';
import { StatsCard } from '../../student/components/home/StatsCard'; // Reusing student's StatsCard
import { EventCard } from '../../student/components/calendar/EventCard'; // Reusing student's EventCard

// Mock Data for Teacher Dashboard
interface CourseInfo {
  id: string;
  name: string;
  students: number;
  pendingTasksToReview: number;
}

interface TeacherDashboardData {
  teacherName: string;
  courses: CourseInfo[];
  upcomingClasses: any[]; // Reusing Event type from student module
  pendingMessages: number;
}

const mockTeacherData: TeacherDashboardData = {
  teacherName: 'Prof. Ana García',
  courses: [
    {
      id: 'math3',
      name: 'Matemáticas III',
      students: 30,
      pendingTasksToReview: 5,
    },
    {
      id: 'hist1',
      name: 'Historia Universal',
      students: 28,
      pendingTasksToReview: 2,
    },
  ],
  upcomingClasses: [
    {
      id: 'uc1',
      title: 'Clase de Matemáticas III',
      subtitle: 'Aula 301',
      day: 15,
      month: 'Nov',
      color: 'blue',
      time: '09:00 AM',
    },
    {
      id: 'uc2',
      title: 'Clase de Historia Universal',
      subtitle: 'Aula 205',
      day: 15,
      month: 'Nov',
      color: 'green',
      time: '11:00 AM',
    },
  ],
  pendingMessages: 3,
};

export const DashboardDocenteHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Bienvenido, {mockTeacherData.teacherName}
        </h1>
        <p className="text-neutral-600">
          Aquí tienes un resumen de tu actividad académica.
        </p>
      </Card>

      {/* Courses Overview */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-6">Mis Cursos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTeacherData.courses.map((course) => (
            <div key={course.id} className="bg-neutral-50 rounded-2xl shadow-md p-5 flex flex-col items-center text-center">
              <BookOpen className="w-10 h-10 text-accent mb-3" />
              <h3 className="text-xl font-semibold text-primary mb-2">{course.name}</h3>
              <p className="text-neutral-600 mb-1">Estudiantes: {course.students}</p>
              <p className="text-neutral-600">Tareas por revisar: {course.pendingTasksToReview}</p>
              <button className="mt-4 bg-primary text-white py-2 px-4 rounded-full text-sm hover:bg-opacity-90 transition">
                Ver Curso
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          id="teacher-stat-students"
          value={mockTeacherData.courses.reduce((acc, curr) => acc + curr.students, 0).toString()}
          label="Total Estudiantes"
          subtitle=""
          icon={Users as React.ElementType}
          color="blue"
        />
        <StatsCard
          id="teacher-stat-pending-tasks"
          value={mockTeacherData.courses.reduce((acc, curr) => acc + curr.pendingTasksToReview, 0).toString()}
          label="Tareas Pendientes"
          subtitle=""
          icon={BookOpen as React.ElementType}
          color="orange"
        />
        <StatsCard
          id="teacher-stat-upcoming-classes"
          value={mockTeacherData.upcomingClasses.length.toString()}
          label="Clases Próximas"
          subtitle=""
          icon={Clock as React.ElementType}
          color="green"
        />
        <StatsCard
          id="teacher-stat-new-messages"
          value={mockTeacherData.pendingMessages.toString()}
          label="Mensajes Nuevos"
          subtitle=""
          icon={Mail as React.ElementType}
          color="red"
        />
      </div>

      {/* Upcoming Classes */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-primary mb-6">Próximas Clases</h2>
        <div className="space-y-4">
          {mockTeacherData.upcomingClasses.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Card>
    </div>
  );
};
