import { useParams } from 'react-router-dom';
import { Card } from '@/shared/components/Card';
import { BookOpen, User, Clock, FileText, Video, ChevronLeft, Users, Link as LinkIcon } from 'lucide-react'; // Added Users, LinkIcon
import { Link } from 'react-router-dom';

interface CourseDetailData {
  id: string;
  name: string;
  professor: string;
  description: string;
  schedule: string;
  credits: number;
  studentsCount: number;
  syllabus: string[]; // List of topics
  materials: { name: string; url: string; type: 'file' | 'link' }[];
  videos: { name: string; url: string }[];
  announcements: { id: string; title: string; date: string; content: string }[];
}

const mockCourseDetails: { [key: string]: CourseDetailData } = {
  'course-1': { // Renamed from c1
    id: 'course-1',
    name: 'Matemáticas', // Updated name
    professor: 'Prof. María García', // Updated professor
    description: 'Curso avanzado de matemáticas que cubre temas de cálculo multivariable, álgebra lineal y ecuaciones diferenciales. Se enfoca en la aplicación práctica de conceptos matemáticos en ingeniería y ciencias.',
    schedule: 'Lunes, Miércoles, Viernes 08:00 - 09:30 AM', // Updated schedule
    credits: 5,
    studentsCount: 28, // Updated students count
    syllabus: [
      'Introducción al Álgebra',
      'Ecuaciones Cuadráticas',
      'Funciones y Gráficas',
      'Geometría Analítica',
      'Cálculo Diferencial Básico',
    ],
    materials: [
      { name: 'Libro de Texto: Álgebra y Geometría', url: '#', type: 'file' },
      { name: 'Guía de Ejercicios Semana 1-5', url: '#', type: 'file' },
      { name: 'Recursos Adicionales de Álgebra', url: '#', type: 'link' },
    ],
    videos: [
      { name: 'Clase Grabada: Ecuaciones Cuadráticas', url: '#video1' },
      { name: 'Tutorial: Funciones Lineales', url: '#video2' },
    ],
    announcements: [
      { id: 'a1', title: 'Recordatorio: Examen Parcial el 20/11', date: '2025-11-10', content: 'El examen parcial se realizará en el aula 301. No olvides traer tu calculadora.' },
      { id: 'a2', title: 'Nueva Tarea: Ejercicios de Integrales', date: '2025-11-05', content: 'Se ha publicado una nueva tarea en la sección de tareas del curso.' },
    ],
  },
  'course-2': { // Renamed from c2
    id: 'course-2',
    name: 'Comunicación', // Updated name
    professor: 'Prof. Roberto Rodríguez', // Updated professor
    description: 'Un curso que explora las diversas formas de comunicación, desde la expresión oral y escrita hasta la comunicación digital y no verbal, con énfasis en el desarrollo de habilidades críticas.',
    schedule: 'Martes, Jueves 10:00 - 11:30 AM', // Updated schedule
    credits: 4,
    studentsCount: 28, // Updated students count
    syllabus: [
      'Principios de la Comunicación',
      'Comunicación Oral y Escrita',
      'Géneros Literarios',
      'Análisis Crítico de Textos',
      'Comunicación Digital',
    ],
    materials: [
      { name: 'Lecturas Complementarias: Literatura Contemporánea', url: '#', type: 'file' },
      { name: 'Guía de Redacción Académica', url: '#', type: 'file' },
    ],
    videos: [
      { name: 'Taller de Oratoria', url: '#video3' },
    ],
    announcements: [
      { id: 'a3', title: 'Cambio de Fecha: Exposición de Proyectos', date: '2025-11-12', content: 'La exposición de proyectos se ha movido al 01 de diciembre.' },
    ],
  },
  'course-3': {
    id: 'course-3',
    name: 'Ciencias Sociales',
    professor: 'Prof. Ana Silva',
    description: 'Estudio de las sociedades humanas, sus interacciones y desarrollo a lo largo del tiempo, con un enfoque en la historia, geografía y civismo.',
    schedule: 'Lunes, Miércoles 02:00 - 03:30 PM',
    credits: 4,
    studentsCount: 28,
    syllabus: [
      'Historia del Perú Republicano',
      'Geografía Humana',
      'Economía Básica',
      'Formación Ciudadana',
    ],
    materials: [
      { name: 'Libro de Historia del Perú', url: '#', type: 'file' },
      { name: 'Atlas Geográfico', url: '#', type: 'file' },
    ],
    videos: [],
    announcements: [],
  },
  'course-4': {
    id: 'course-4',
    name: 'Ciencia y Tecnología',
    professor: 'Prof. Carlos López',
    description: 'Exploración de los principios fundamentales de la física, química y biología, y su aplicación en el desarrollo tecnológico y la innovación.',
    schedule: 'Martes, Viernes 11:00 - 12:30 PM',
    credits: 5,
    studentsCount: 28,
    syllabus: [
      'Física: Mecánica y Termodinámica',
      'Química: Estructura Atómica y Enlaces',
      'Biología: Célula y Genética',
      'Tecnología y Sociedad',
    ],
    materials: [
      { name: 'Manual de Laboratorio', url: '#', type: 'file' },
      { name: 'Artículos Científicos', url: '#', type: 'link' },
    ],
    videos: [
      { name: 'Experimentos de Física', url: '#video4' },
    ],
    announcements: [],
  },
  'course-5': {
    id: 'course-5',
    name: 'Inglés',
    professor: 'Prof. Jennifer Smith',
    description: 'Desarrollo de habilidades comunicativas en inglés, incluyendo gramática avanzada, conversación fluida y comprensión lectora.',
    schedule: 'Lunes, Jueves 09:00 - 10:30 AM',
    credits: 4,
    studentsCount: 28,
    syllabus: [
      'Gramática Avanzada',
      'Conversación y Pronunciación',
      'Lectura y Escritura Académica',
      'Cultura Anglosajona',
    ],
    materials: [
      { name: 'Libro de Inglés Avanzado', url: '#', type: 'file' },
      { name: 'Ejercicios de Listening', url: '#', type: 'link' },
    ],
    videos: [],
    announcements: [],
  },
  'course-6': {
    id: 'course-6',
    name: 'Educación Física',
    professor: 'Prof. Diego Martínez',
    description: 'Promoción de la actividad física, el deporte y hábitos de vida saludable, desarrollando habilidades motoras y trabajo en equipo.',
    schedule: 'Miércoles, Viernes 03:00 - 04:30 PM',
    credits: 2,
    studentsCount: 28,
    syllabus: [
      'Deportes de Equipo (Fútbol, Vóley)',
      'Atletismo',
      'Gimnasia',
      'Vida Saludable y Nutrición',
    ],
    materials: [],
    videos: [
      { name: 'Rutinas de Calentamiento', url: '#video5' },
    ],
    announcements: [],
  },
  'course-7': {
    id: 'course-7',
    name: 'Arte y Cultura',
    professor: 'Prof. Laura Castillo',
    description: 'Exploración de diversas expresiones artísticas y culturales, fomentando la creatividad y el aprecio por el patrimonio cultural.',
    schedule: 'Jueves 01:00 - 02:30 PM',
    credits: 3,
    studentsCount: 28,
    syllabus: [
      'Historia del Arte Peruano',
      'Técnicas de Dibujo y Pintura',
      'Música y Danza',
      'Patrimonio Cultural',
    ],
    materials: [
      { name: 'Materiales de Dibujo', url: '#', type: 'file' },
    ],
    videos: [],
    announcements: [],
  },
  'course-8': {
    id: 'course-8',
    name: 'Religión',
    professor: 'Prof. Pedro Ramírez',
    description: 'Estudio de los principios y valores religiosos, promoviendo la reflexión ética y el desarrollo espiritual de los estudiantes.',
    schedule: 'Martes 01:00 - 02:30 PM',
    credits: 2,
    studentsCount: 28,
    syllabus: [
      'Valores Ignacianos',
      'Historia de las Religiones',
      'Ética y Moral',
      'Servicio Comunitario',
    ],
    materials: [
      { name: 'Textos Sagrados', url: '#', type: 'file' },
    ],
    videos: [],
    announcements: [],
  },
};

export const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseId ? mockCourseDetails[courseId] : null;

  if (!course) {
    return (
      <Card className="p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Curso no encontrado</h1>
        <p className="text-neutral-700">El ID del curso proporcionado no es válido.</p>
        <Link to="/dashboard/cursos" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-opacity-90 transition">
          <ChevronLeft className="w-4 h-4 mr-2" /> Volver a Mis Cursos
        </Link>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <Link to="/dashboard/cursos" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-primary bg-neutral-200 hover:bg-neutral-300 transition">
          <ChevronLeft className="w-4 h-4 mr-2" /> Volver a Mis Cursos
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-primary mb-4">{course.name}</h1>
      <p className="text-lg text-neutral-600 mb-6">Profesor: {course.professor}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Course Description */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Descripción del Curso</h2>
            <p className="text-neutral-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Syllabus */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Temario</h2>
            <ul className="list-disc list-inside text-neutral-700 space-y-1">
              {course.syllabus.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Materiales del Curso</h2>
            <div className="space-y-3">
              {course.materials.length > 0 ? (
                course.materials.map((material, index) => (
                  <a key={index} href={material.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition border border-neutral-200">
                    {material.type === 'file' ? <FileText className="w-5 h-5 text-primary" /> : <LinkIcon className="w-5 h-5 text-accent" />}
                    <span className="text-neutral-800">{material.name}</span>
                  </a>
                ))
              ) : (
                <p className="text-neutral-600">No hay materiales disponibles.</p>
              )}
            </div>
          </div>

          {/* Videos */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-3 border-b pb-2">Videos</h2>
            <div className="space-y-3">
              {course.videos.length > 0 ? (
                course.videos.map((video, index) => (
                  <a key={index} href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition border border-neutral-200">
                    <Video className="w-5 h-5 text-primary" />
                    <span className="text-neutral-800">{video.name}</span>
                  </a>
                ))
              ) : (
                <p className="text-neutral-600">No hay videos disponibles.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-4">
            <h3 className="text-xl font-bold text-primary mb-3 border-b pb-2">Información Rápida</h3>
            <div className="space-y-3 text-neutral-700">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-accent" />
                <span>{course.professor}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-accent" />
                <span>{course.schedule}</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-accent" />
                <span>Créditos: {course.credits}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-accent" />
                <span>Estudiantes: {course.studentsCount}</span>
              </div>
            </div>
          </Card>

          {/* Announcements */}
          <Card className="p-4">
            <h3 className="text-xl font-bold text-primary mb-3 border-b pb-2">Anuncios</h3>
            <div className="space-y-4">
              {course.announcements.length > 0 ? (
                course.announcements.map(announcement => (
                  <div key={announcement.id} className="border-l-4 border-secondary pl-3">
                    <p className="text-sm font-semibold text-neutral-800">{announcement.title}</p>
                    <p className="text-xs text-neutral-500">{announcement.date}</p>
                    <p className="text-sm text-neutral-700 mt-1">{announcement.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-neutral-600">No hay anuncios recientes.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </Card>
  );
};