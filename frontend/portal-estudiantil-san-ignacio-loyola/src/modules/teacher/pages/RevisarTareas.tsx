import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Clock, AlertCircle, BookOpen, User, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface SubmittedTask {
  id: string;
  studentName: string;
  studentId: string;
  taskTitle: string;
  course: string;
  dueDate: string; // YYYY-MM-DD
  submissionDate: string; // YYYY-MM-DD
  status: 'pending_review' | 'reviewed' | 'late_submission';
  grade?: number;
  comments?: string;
  submissionContent?: string; // Added for mock submission content
}

const mockSubmittedTasks: SubmittedTask[] = [
  {
    id: 'st1',
    studentName: 'Sofía Rodríguez',
    studentId: 'child1',
    taskTitle: 'Ensayo sobre la Revolución Francesa',
    course: 'Historia Universal',
    dueDate: '2025-11-15',
    submissionDate: '2025-11-14',
    status: 'pending_review',
    submissionContent: 'Adjunto mi ensayo sobre la Revolución Francesa. Espero sus comentarios.',
  },
  {
    id: 'st2',
    studentName: 'Pedro Rodríguez',
    studentId: 'child2',
    taskTitle: 'Resolución de Ejercicios de Álgebra',
    course: 'Matemáticas III',
    dueDate: '2025-11-10',
    submissionDate: '2025-11-11',
    status: 'late_submission',
    submissionContent: 'Aquí están los ejercicios resueltos. Disculpe la demora.',
  },
  {
    id: 'st3',
    studentName: 'Sofía Rodríguez',
    studentId: 'child1',
    taskTitle: 'Presentación de Proyecto de Ciencias',
    course: 'Ciencias Naturales',
    dueDate: '2025-11-20',
    submissionDate: '2025-11-19',
    status: 'reviewed',
    grade: 18,
    comments: 'Excelente investigación y presentación clara.',
    submissionContent: 'Enlace a la presentación: drive.google.com/projecto_ciencias',
  },
  {
    id: 'st4',
    studentName: 'Pedro Rodríguez',
    studentId: 'child2',
    taskTitle: 'Lectura "Cien Años de Soledad"',
    course: 'Literatura',
    dueDate: '2025-10-30',
    submissionDate: '2025-10-29',
    status: 'reviewed',
    grade: 15,
    comments: 'Buen resumen, pero faltó profundizar en algunos personajes.',
    submissionContent: 'Resumen de la lectura adjunto.',
  },
];

const TaskReviewCard: React.FC<{ task: SubmittedTask; onViewDetails: (task: SubmittedTask) => void }> = ({ task, onViewDetails }) => {
  const getStatusClasses = (status: SubmittedTask['status']) => {
    switch (status) {
      case 'pending_review':
        return 'bg-blue-100 text-blue-800';
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'late_submission':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: SubmittedTask['status']) => {
    switch (status) {
      case 'pending_review':
        return <Clock className="w-4 h-4" />;
      case 'reviewed':
        return <CheckCircle className="w-4 h-4" />;
      case 'late_submission':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formattedDueDate = format(new Date(task.dueDate), 'dd MMMM yyyy', { locale: es });
  const formattedSubmissionDate = format(new Date(task.submissionDate), 'dd MMMM yyyy', { locale: es });

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusClasses(task.status)}`}>
          {getStatusIcon(task.status)}
          {task.status === 'pending_review' && 'Pendiente de Revisión'}
          {task.status === 'reviewed' && 'Revisada'}
          {task.status === 'late_submission' && 'Entrega Tardía'}
        </span>
        <span className="text-sm text-neutral-500 flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          Entrega: {formattedDueDate}
        </span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{task.taskTitle}</h3>
      <p className="text-neutral-600 text-sm mb-3 flex-grow flex items-center gap-2">
        <User className="w-4 h-4 text-accent" />
        {task.studentName} ({task.studentId})
      </p>
      <p className="text-neutral-600 text-sm mb-3 flex-grow flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-accent" />
        {task.course}
      </p>
      <p className="text-neutral-600 text-sm mb-3 flex-grow flex items-center gap-2">
        <Clock className="w-4 h-4 text-accent" />
        Enviado: {formattedSubmissionDate}
      </p>

      {task.status === 'reviewed' && task.grade !== undefined && (
        <div className="mt-2">
          <p className="text-lg font-bold text-green-700">Calificación: {task.grade}</p>
          {task.comments && <p className="text-sm text-neutral-600">Comentarios: {task.comments}</p>}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={() => onViewDetails(task)}
          className="bg-primary text-white py-2 px-4 rounded-full text-sm hover:bg-opacity-90 transition"
        >
          {task.status === 'pending_review' ? 'Revisar Tarea' : 'Ver Detalles'}
        </button>
      </div>
    </div>
  );
};

export const RevisarTareas = () => {
  const [filter, setFilter] = useState<'all' | 'pending_review' | 'reviewed' | 'late_submission'>('all');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleViewDetails = (task: SubmittedTask) => {
    navigate(`/dashboard-docente/revisar-tareas/${task.id}`);
  };

  const filteredTasks = mockSubmittedTasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Revisar Tareas</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter('pending_review')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'pending_review' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          Pendientes de Revisión
        </button>
        <button
          onClick={() => setFilter('reviewed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'reviewed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Revisadas
        </button>
        <button
          onClick={() => setFilter('late_submission')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'late_submission' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          Entregas Tardías
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskReviewCard key={task.id} task={task} onViewDetails={handleViewDetails} />
          ))
        ) : (
          <p className="text-neutral-600 text-lg col-span-full text-center py-10">No hay tareas en esta categoría.</p>
        )}
      </div>
    </Card>
  );
};
