import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, User, CalendarDays, FileText, ChevronLeft, Save } from 'lucide-react';

interface SubmittedTask {
  id: string;
  studentName: string;
  studentId: string;
  taskTitle: string;
  course: string;
  description?: string; // Added description property
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

export const ReviewTaskDetails = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const task = taskId ? mockSubmittedTasks.find(t => t.id === taskId) : null;

  const [grade, setGrade] = useState<string>(task?.grade?.toString() || '');
  const [comments, setComments] = useState<string>(task?.comments || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!task) {
    return (
      <Card className="p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Tarea no encontrada</h1>
        <p className="text-neutral-700">El ID de la tarea proporcionado no es válido.</p>
        <button
          onClick={() => navigate('/dashboard-docente/revisar-tareas')}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-opacity-90 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Volver a Revisar Tareas
        </button>
      </Card>
    );
  }

  const handleSaveReview = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      console.log(`Guardando revisión para tarea ${task.id}: Calificación ${grade}, Comentarios: ${comments}`);
      // In a real app, update backend and then navigate or show success
      alert('Revisión guardada con éxito!'); // Will replace with modal later if needed
      setIsSaving(false);
      navigate('/dashboard-docente/revisar-tareas'); // Go back to the list
    }, 1000);
  };

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

  const getStatusText = (status: SubmittedTask['status']) => {
    switch (status) {
      case 'pending_review':
        return 'Pendiente de Revisión';
      case 'reviewed':
        return 'Revisada';
      case 'late_submission':
        return 'Entrega Tardía';
      default:
        return '';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard-docente/revisar-tareas')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-primary bg-neutral-200 hover:bg-neutral-300 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Volver a Revisar Tareas
        </button>
      </div>

      <h1 className="text-3xl font-bold text-primary mb-4">{task.taskTitle}</h1>
      <p className="text-lg text-neutral-600 mb-6">Curso: {task.course}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Student and Task Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Información de la Tarea</h2>
            <div className="space-y-2 text-neutral-700">
              <p className="flex items-center gap-2"><User className="w-5 h-5 text-accent" /> Estudiante: {task.studentName}</p>
              <p className="flex items-center gap-2"><CalendarDays className="w-5 h-5 text-accent" /> Fecha de Entrega: {format(new Date(task.dueDate), 'dd MMMM yyyy', { locale: es })}</p>
              <p className="flex items-center gap-2"><Clock className="w-5 h-5 text-accent" /> Enviado: {format(new Date(task.submissionDate), 'dd MMMM yyyy', { locale: es })}</p>
              <p className="flex items-center gap-2">
                Estado: <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
              </p>
            </div>
          </div>

          {/* Task Description */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Descripción de la Tarea</h2>
            <p className="text-neutral-700 leading-relaxed">{task.description}</p> {/* Assuming task object has description */}
          </div>

          {/* Submission Content */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Contenido de la Entrega</h2>
            {task.submissionContent ? (
              <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                <p className="text-neutral-800 whitespace-pre-wrap">{task.submissionContent}</p>
                {task.submissionContent.includes('http') && (
                  <a href={task.submissionContent} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 mt-2">
                    <FileText className="w-4 h-4" /> Ver Archivo/Enlace
                  </a>
                )}
              </div>
            ) : (
              <p className="text-neutral-600">El estudiante no proporcionó contenido de entrega.</p>
            )}
          </div>
        </div>

        {/* Review Form / Existing Review */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <h3 className="text-xl font-bold text-primary mb-3 border-b pb-2">Revisión</h3>
            {(task.status === 'pending_review' || task.status === 'late_submission') ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-neutral-700 mb-1">
                    Calificación:
                  </label>
                  <input
                    type="number"
                    id="grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    min="0"
                    max="20"
                  />
                </div>
                <div>
                  <label htmlFor="comments" className="block text-sm font-medium text-neutral-700 mb-1">
                    Comentarios:
                  </label>
                  <textarea
                    id="comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Añade tus comentarios sobre la tarea..."
                  ></textarea>
                </div>
                <button
                  onClick={handleSaveReview}
                  disabled={isSaving}
                  className="w-full bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Guardando...' : <><Save className="w-5 h-5" /> Guardar Revisión</>}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-lg font-bold text-green-700">Calificación: {task.grade}</p>
                {task.comments && (
                  <div>
                    <p className="font-semibold text-primary">Comentarios:</p>
                    <p className="text-neutral-700">{task.comments}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </Card>
  );
};