import React, { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Clock, AlertCircle, BookOpen, CalendarDays, Upload } from 'lucide-react'; // Added Upload icon
import { Modal } from '@/shared/components/Modal'; // Import Modal component

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  course: string;
  status: 'pending' | 'completed' | 'overdue';
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Ensayo sobre la Revolución Francesa',
    description: 'Investigar y redactar un ensayo de 1000 palabras sobre las causas y consecuencias de la Revolución Francesa.',
    dueDate: '2025-11-15',
    course: 'Historia Universal',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Resolución de Ejercicios de Álgebra',
    description: 'Resolver los ejercicios del capítulo 5 del libro de texto de Álgebra Lineal.',
    dueDate: '2025-11-10',
    course: 'Matemáticas III',
    status: 'overdue',
  },
  {
    id: '3',
    title: 'Presentación de Proyecto de Ciencias',
    description: 'Preparar una presentación oral y visual sobre el proyecto de energía renovable.',
    dueDate: '2025-11-20',
    course: 'Ciencias Naturales',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Lectura "Cien Años de Soledad"',
    description: 'Leer las primeras 100 páginas de la novela y preparar un resumen de los personajes principales.',
    dueDate: '2025-10-30',
    course: 'Literatura',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Informe de Laboratorio de Química',
    description: 'Redactar el informe completo del experimento de titulación ácido-base.',
    dueDate: '2025-11-12',
    course: 'Química General',
    status: 'overdue',
  },
  {
    id: '6',
    title: 'Exposición Oral de Inglés',
    description: 'Preparar una exposición de 5 minutos sobre un tema de libre elección en inglés.',
    dueDate: '2025-11-25',
    course: 'Inglés Avanzado',
    status: 'pending',
  },
];

const TaskCard: React.FC<{ task: Task; onSubmitTask: (task: Task) => void }> = ({ task, onSubmitTask }) => {
  const getStatusClasses = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formattedDueDate = format(new Date(task.dueDate), 'dd MMMM yyyy', { locale: es });

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusClasses(task.status)}`}>
          {getStatusIcon(task.status)}
          {task.status === 'pending' && 'Pendiente'}
          {task.status === 'completed' && 'Completada'}
          {task.status === 'overdue' && 'Vencida'}
        </span>
        <span className="text-sm text-neutral-500 flex items-center gap-1">
          <CalendarDays className="w-4 h-4" />
          {formattedDueDate}
        </span>
      </div>
      <h3 className="text-xl font-bold text-primary mb-2">{task.title}</h3>
      <p className="text-neutral-600 text-sm mb-3 flex-grow">{task.description}</p>
      <div className="flex items-center gap-2 text-sm text-neutral-700 mt-auto">
        <BookOpen className="w-4 h-4 text-accent" />
        <span>{task.course}</span>
      </div>
      {task.status === 'pending' || task.status === 'overdue' ? (
        <button
          onClick={() => onSubmitTask(task)}
          className="mt-4 bg-primary text-white py-2 px-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-opacity-90 transition"
        >
          <Upload className="w-5 h-5" />
          Entregar Tarea
        </button>
      ) : null}
    </div>
  );
};

export const Tareas = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskForSubmission, setSelectedTaskForSubmission] = useState<Task | null>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submittedTasks, setSubmittedTasks] = useState<string[]>([]); // To track submitted tasks

  const openSubmissionModal = (task: Task) => {
    setSelectedTaskForSubmission(task);
    setIsModalOpen(true);
  };

  const closeSubmissionModal = () => {
    setSelectedTaskForSubmission(null);
    setSubmissionText('');
    setIsModalOpen(false);
  };

  const handleConfirmSubmission = () => {
    if (selectedTaskForSubmission) {
      // Simulate submission logic
      console.log(`Tarea "${selectedTaskForSubmission.title}" entregada con:`, submissionText);
      setSubmittedTasks(prev => [...prev, selectedTaskForSubmission.id]);
      alert(`Tarea "${selectedTaskForSubmission.title}" entregada con éxito!`); // Will replace with modal later
      closeSubmissionModal();
    }
  };

  const filteredTasks = mockTasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  }).map(task => ({
    ...task,
    status: submittedTasks.includes(task.id) ? 'completed' : task.status, // Update status if submitted
  }));

  const renderSubmissionModalContent = () => {
    if (!selectedTaskForSubmission) return null;
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold text-primary">Entregar Tarea: {selectedTaskForSubmission.title}</p>
        <div>
          <label htmlFor="submissionText" className="block text-sm font-medium text-neutral-700 mb-1">
            Comentarios o Enlace de Entrega:
          </label>
          <textarea
            id="submissionText"
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Escribe tus comentarios o pega el enlace de tu trabajo aquí..."
          ></textarea>
        </div>
        {/* Placeholder for file upload */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Adjuntar Archivo (opcional):
          </label>
          <input type="file" className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-opacity-90" />
        </div>
      </div>
    );
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Mis Tareas</h1>

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
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'completed' ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          Completadas
        </button>
        <button
          onClick={() => setFilter('overdue')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'overdue' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'
          }`}
        >
          Vencidas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onSubmitTask={openSubmissionModal} />
          ))
        ) : (
          <p className="text-neutral-600 text-lg col-span-full text-center py-10">No hay tareas en esta categoría.</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeSubmissionModal}
        title={`Entregar Tarea: ${selectedTaskForSubmission?.title || ''}`}
        onConfirm={handleConfirmSubmission}
        onCancel={closeSubmissionModal}
        confirmText="Confirmar Entrega"
        cancelText="Cancelar"
      >
        {renderSubmissionModalContent()}
      </Modal>
    </Card>
  );
};
