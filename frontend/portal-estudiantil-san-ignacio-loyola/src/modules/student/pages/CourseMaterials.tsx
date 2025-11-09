import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/shared/components/Card';
import { FileText, Link as LinkIcon, ChevronLeft, Download, Video, BookOpen, CalendarDays } from 'lucide-react';

interface MaterialItem {
  id: string;
  name: string;
  type: 'file' | 'link' | 'video';
  url: string;
  description?: string;
  uploadDate: string;
  week?: number; // Added week property
}

interface CourseMaterialsData {
  courseId: string;
  courseName: string;
  syllabus?: MaterialItem[];
  documents?: MaterialItem[];
  videos?: MaterialItem[];
  recordings?: MaterialItem[];
  other?: MaterialItem[];
}

const mockCourseMaterials: CourseMaterialsData[] = [
  {
    courseId: 'course-1',
    courseName: 'Matemáticas',
    syllabus: [
      { id: 'syl1', name: 'Sílabo del Curso 2025-I', type: 'file', url: '#', description: 'Plan de estudios detallado.', uploadDate: '2025-08-28' },
    ],
    documents: [
      { id: 'mat1', name: 'Libro de Texto: Álgebra y Geometría', type: 'file', url: '#', description: 'Capítulos 1-5 del libro de texto oficial.', uploadDate: '2025-09-01', week: 1 },
      { id: 'mat2', name: 'Guía de Ejercicios Semana 1-5', type: 'file', url: '#', description: 'Ejercicios prácticos para reforzar los temas de las primeras cinco semanas.', uploadDate: '2025-09-05', week: 2 },
      { id: 'mat4', name: 'Formulario de Fórmulas Básicas', type: 'file', url: '#', description: 'Compendio de fórmulas esenciales para el curso.', uploadDate: '2025-09-15', week: 3 },
    ],
    videos: [
      { id: 'vid1', name: 'Video: Ecuaciones Lineales', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Tutorial sobre cómo resolver ecuaciones lineales.', uploadDate: '2025-09-10', week: 2 },
    ],
    other: [
      { id: 'mat3', name: 'Recursos Adicionales de Álgebra', type: 'link', url: 'https://www.khanacademy.org/math/algebra', description: 'Enlace a Khan Academy para recursos adicionales de álgebra.', uploadDate: '2025-09-10', week: 2 },
    ],
  },
  {
    courseId: 'course-2',
    courseName: 'Comunicación',
    syllabus: [
      { id: 'syl2', name: 'Sílabo de Comunicación 2025-I', type: 'file', url: '#', description: 'Plan de estudios detallado.', uploadDate: '2025-08-29' },
    ],
    documents: [
      { id: 'com1', name: 'Lecturas Complementarias: Literatura Contemporánea', type: 'file', url: '#', description: 'Artículos y ensayos sobre autores contemporáneos.', uploadDate: '2025-09-03', week: 1 },
      { id: 'com2', name: 'Guía de Redacción Académica', type: 'file', url: '#', description: 'Consejos y ejemplos para la redacción de trabajos académicos.', uploadDate: '2025-09-08', week: 2 },
    ],
    videos: [],
    recordings: [
      { id: 'rec1', name: 'Grabación Clase 1: Introducción a la Comunicación', type: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: 'Grabación de la primera clase del curso.', uploadDate: '2025-09-02', week: 1 },
    ],
    other: [],
  },
  // Add mock data for other courses (course-3 to course-8) with similar structure
  {
    courseId: 'course-3',
    courseName: 'Ciencias Sociales',
    syllabus: [{ id: 'syl3', name: 'Sílabo CCSS 2025-I', type: 'file', url: '#', uploadDate: '2025-08-28' }],
    documents: [
      { id: 'cs1', name: 'Libro de Historia del Perú', type: 'file', url: '#', description: 'Texto principal del curso.', uploadDate: '2025-09-01', week: 1 },
      { id: 'cs2', name: 'Atlas Geográfico Mundial', type: 'file', url: '#', description: 'Mapas y datos geográficos.', uploadDate: '2025-09-07', week: 2 },
    ],
  },
  {
    courseId: 'course-4',
    courseName: 'Ciencia y Tecnología',
    syllabus: [{ id: 'syl4', name: 'Sílabo CyT 2025-I', type: 'file', url: '#', uploadDate: '2025-08-29' }],
    documents: [
      { id: 'ct1', name: 'Manual de Laboratorio', type: 'file', url: '#', description: 'Guía para experimentos.', uploadDate: '2025-09-05', week: 1 },
    ],
    other: [
      { id: 'ct2', name: 'Artículos Científicos Relevantes', type: 'link', url: 'https://www.nature.com/', description: 'Enlaces a publicaciones científicas.', uploadDate: '2025-09-12', week: 2 },
    ],
  },
  {
    courseId: 'course-5',
    courseName: 'Inglés',
    syllabus: [{ id: 'syl5', name: 'Sílabo Inglés 2025-I', type: 'file', url: '#', uploadDate: '2025-08-30' }],
    documents: [
      { id: 'ing1', name: 'Libro de Inglés Avanzado', type: 'file', url: '#', description: 'Libro de texto para el nivel avanzado.', uploadDate: '2025-09-02', week: 1 },
    ],
    other: [
      { id: 'ing2', name: 'Ejercicios de Listening', type: 'link', url: 'https://www.bbc.co.uk/learningenglish/', description: 'Recursos para practicar la comprensión auditiva.', uploadDate: '2025-09-09', week: 2 },
    ],
  },
  {
    courseId: 'course-6',
    courseName: 'Educación Física',
    syllabus: [{ id: 'syl6', name: 'Sílabo EF 2025-I', type: 'file', url: '#', uploadDate: '2025-08-28' }],
    documents: [
      { id: 'ef1', name: 'Guía de Ejercicios de Calentamiento', type: 'file', url: '#', description: 'Rutinas para antes de la actividad física.', uploadDate: '2025-09-06', week: 1 },
    ],
  },
  {
    courseId: 'course-7',
    courseName: 'Arte y Cultura',
    syllabus: [{ id: 'syl7', name: 'Sílabo AC 2025-I', type: 'file', url: '#', uploadDate: '2025-08-29' }],
    documents: [
      { id: 'ac1', name: 'Materiales de Dibujo y Pintura', type: 'file', url: '#', description: 'Guía de técnicas básicas.', uploadDate: '2025-09-04', week: 1 },
    ],
  },
  {
    courseId: 'course-8',
    courseName: 'Religión',
    syllabus: [{ id: 'syl8', name: 'Sílabo Religión 2025-I', type: 'file', url: '#', uploadDate: '2025-08-30' }],
    documents: [
      { id: 'rel1', name: 'Textos Sagrados y Reflexiones', type: 'file', url: '#', description: 'Lecturas para el curso de religión.', uploadDate: '2025-09-01', week: 1 },
    ],
  },
];

export const CourseMaterials = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const courseData = mockCourseMaterials.find(data => data.courseId === courseId);

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'syllabus' | 'documents' | 'videos' | 'recordings' | 'other'>('all');
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');

  if (!courseData) {
    return (
      <Card className="p-6 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Materiales no encontrados</h1>
        <p className="text-neutral-700">El ID del curso proporcionado no es válido o no tiene materiales.</p>
        <button
          onClick={() => navigate('/dashboard/cursos')}
          className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-primary hover:bg-opacity-90 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Volver a Mis Cursos
        </button>
      </Card>
    );
  }

  const allMaterials: MaterialItem[] = [
    ...(courseData.syllabus || []),
    ...(courseData.documents || []),
    ...(courseData.videos || []),
    ...(courseData.recordings || []),
    ...(courseData.other || []),
  ];

  const availableWeeks = Array.from(new Set(allMaterials.map(m => m.week).filter(Boolean) as number[])).sort((a, b) => a - b);

  const filteredMaterials = allMaterials.filter(material => {
    const categoryMatch = selectedCategory === 'all' ||
      (selectedCategory === 'syllabus' && courseData.syllabus?.includes(material)) ||
      (selectedCategory === 'documents' && courseData.documents?.includes(material)) ||
      (selectedCategory === 'videos' && courseData.videos?.includes(material)) ||
      (selectedCategory === 'recordings' && courseData.recordings?.includes(material)) ||
      (selectedCategory === 'other' && courseData.other?.includes(material));

    const weekMatch = selectedWeek === 'all' || material.week === selectedWeek;

    return categoryMatch && weekMatch;
  });

  const categoryTabs = [
    { key: 'all', label: 'Todos', icon: BookOpen },
    { key: 'syllabus', label: 'Sílabo', icon: FileText },
    { key: 'documents', label: 'Documentos', icon: FileText },
    { key: 'videos', label: 'Videos', icon: Video },
    { key: 'recordings', label: 'Grabaciones', icon: Video },
    { key: 'other', label: 'Otros', icon: LinkIcon },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard/cursos')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-primary bg-neutral-200 hover:bg-neutral-300 transition"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Volver a Mis Cursos
        </button>
      </div>

      <h1 className="text-3xl font-bold text-primary mb-4">Materiales de {courseData.courseName}</h1>
      <p className="text-lg text-neutral-600 mb-6">Aquí encontrarás todos los recursos disponibles para este curso, organizados por categoría y semana.</p>

      {/* Sub-navbar for categories */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-neutral-200 pb-4">
        {categoryTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2
              ${selectedCategory === tab.key ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Week Filter */}
      {availableWeeks.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm font-medium text-neutral-700 self-center">Filtrar por Semana:</span>
          <button
            onClick={() => setSelectedWeek('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedWeek === 'all' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}
            `}
          >
            Todas
          </button>
          {availableWeeks.map(week => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedWeek === week ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}
              `}
            >
              Semana {week}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredMaterials.length > 0 ? (
          filteredMaterials.map(material => (
            <div key={material.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-neutral-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                {material.type === 'file' && <FileText className="w-6 h-6 text-primary" />}
                {material.type === 'link' && <LinkIcon className="w-6 h-6 text-accent" />}
                {material.type === 'video' && <Video className="w-6 h-6 text-red-500" />}
                <div>
                  <h2 className="text-lg font-semibold text-primary">{material.name}</h2>
                  {material.description && <p className="text-sm text-neutral-600">{material.description}</p>}
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                    {material.week && <span>Semana {material.week} | </span>}
                    <span>Subido: {material.uploadDate}</span>
                  </div>
                </div>
              </div>
              <a
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-opacity-90 transition flex items-center gap-2"
              >
                {material.type === 'file' ? <Download className="w-4 h-4" /> : null}
                {material.type === 'link' ? <LinkIcon className="w-4 h-4" /> : null}
                {material.type === 'video' ? <Video className="w-4 h-4" /> : null}
                {material.type === 'file' ? 'Descargar' : 'Abrir'}
              </a>
            </div>
          ))
        ) : (
          <p className="text-neutral-600 text-lg text-center py-10">No hay materiales disponibles para esta categoría o semana.</p>
        )}
      </div>
    </Card>
  );
};