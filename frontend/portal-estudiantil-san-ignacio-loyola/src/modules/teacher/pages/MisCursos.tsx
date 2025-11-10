import { Card } from '@/shared/components/Card';
import { BookOpen, Users, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TeacherCourse {
  id: string;
  name: string;
  description: string;
  studentsCount: number;
  pendingTasksToReview: number;
}

const mockTeacherCourses: TeacherCourse[] = [
  {
    id: 'math3',
    name: 'Matemáticas III',
    description: 'Curso avanzado de matemáticas para estudiantes de secundaria.',
    studentsCount: 30,
    pendingTasksToReview: 5,
  },
  {
    id: 'hist1',
    name: 'Historia Universal',
    description: 'Estudio de los eventos y civilizaciones más importantes de la historia mundial.',
    studentsCount: 28,
    pendingTasksToReview: 2,
  },
  {
    id: 'lit2',
    name: 'Literatura Española',
    description: 'Análisis de obras literarias clave de la literatura española.',
    studentsCount: 25,
    pendingTasksToReview: 0,
  },
];

export const MisCursos = () => {
  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Mis Cursos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeacherCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-bold text-primary">{course.name}</h2>
            </div>
            <p className="text-neutral-600 text-sm mb-4 flex-grow">{course.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-neutral-700 text-sm">
                <Users className="w-4 h-4" />
                <span>{course.studentsCount} Estudiantes</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-700 text-sm">
                <ClipboardCheck className="w-4 h-4" />
                <span>{course.pendingTasksToReview} Tareas por revisar</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-auto">
              <Link to={`/dashboard-docente/cursos/${course.id}/estudiantes`} className="bg-primary text-white py-2 px-4 rounded-full text-sm hover:bg-opacity-90 transition">
                Ver Estudiantes
              </Link>
              <Link to={`/dashboard-docente/cursos/${course.id}/calificaciones`} className="bg-accent text-white py-2 px-4 rounded-full text-sm hover:bg-opacity-90 transition">
                Gestionar Calificaciones
              </Link>
              <Link to={`/dashboard-docente/cursos/${course.id}/tareas`} className="bg-secondary text-white py-2 px-4 rounded-full text-sm hover:bg-opacity-90 transition">
                Asignar Tarea
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
