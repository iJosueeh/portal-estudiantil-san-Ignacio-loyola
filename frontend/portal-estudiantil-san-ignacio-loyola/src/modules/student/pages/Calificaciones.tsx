import { useState } from 'react';
import { Card } from '@/shared/components/Card';

interface Evaluation {
  name: string;
  grade: number;
  weight: number; // Percentage
}

interface CourseGrade {
  id: string;
  courseName: string;
  period: string;
  professor: string;
  evaluations: Evaluation[];
  finalGrade: number;
}

const mockGrades: CourseGrade[] = [
  {
    id: '1',
    courseName: 'Matemáticas III',
    period: 'Ciclo I',
    professor: 'Lic. Ana García',
    evaluations: [
      { name: 'Examen Parcial', grade: 15, weight: 40 },
      { name: 'Práctica Calificada 1', grade: 18, weight: 20 },
      { name: 'Trabajo en Clase', grade: 16, weight: 20 },
      { name: 'Participación', grade: 19, weight: 20 },
    ],
    finalGrade: 16.6,
  },
  {
    id: '2',
    courseName: 'Historia Universal',
    period: 'Ciclo I',
    professor: 'Mg. Carlos Pérez',
    evaluations: [
      { name: 'Examen Final', grade: 12, weight: 50 },
      { name: 'Exposición', grade: 14, weight: 30 },
      { name: 'Control de Lectura', grade: 10, weight: 20 },
    ],
    finalGrade: 12.4,
  },
  {
    id: '3',
    courseName: 'Ciencias Naturales',
    period: 'Ciclo I',
    professor: 'Dra. Laura Montes',
    evaluations: [
      { name: 'Proyecto de Investigación', grade: 17, weight: 50 },
      { name: 'Examen Parcial', grade: 16, weight: 30 },
      { name: 'Laboratorio', grade: 18, weight: 20 },
    ],
    finalGrade: 16.9,
  },
  {
    id: '4',
    courseName: 'Literatura',
    period: 'Ciclo II',
    professor: 'Lic. Sofía Rojas',
    evaluations: [
      { name: 'Análisis Literario', grade: 14, weight: 40 },
      { name: 'Examen Final', grade: 16, weight: 40 },
      { name: 'Participación', grade: 17, weight: 20 },
    ],
    finalGrade: 15.4,
  },
];

export const Calificaciones = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'all' | string>('all');

  const periods = Array.from(new Set(mockGrades.map(grade => grade.period)));

  const filteredGrades = mockGrades.filter(grade => 
    selectedPeriod === 'all' ? true : grade.period === selectedPeriod
  );

  const getGradeColorClass = (grade: number) => {
    if (grade >= 14) return 'text-green-600'; // Passing grade
    if (grade >= 11) return 'text-orange-600'; // Borderline
    return 'text-red-600'; // Failing grade
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Mis Calificaciones</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setSelectedPeriod('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedPeriod === 'all' ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
          }`}
        >
          Todos los Ciclos
        </button>
        {periods.map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedPeriod === period ? 'bg-primary text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filteredGrades.length > 0 ? (
          filteredGrades.map(courseGrade => (
            <div key={courseGrade.id} className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
              <div className="p-6 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary">{courseGrade.courseName}</h2>
                  <p className="text-sm text-neutral-600">{courseGrade.professor} - {courseGrade.period}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-500">Nota Final</p>
                  <p className={`text-3xl font-bold ${getGradeColorClass(courseGrade.finalGrade)}`}>
                    {courseGrade.finalGrade.toFixed(1)}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">Evaluaciones</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-neutral-200">
                    <thead className="bg-neutral-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Evaluación
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Nota
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                          Peso
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      {courseGrade.evaluations.map((evalItem, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                            {evalItem.name}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getGradeColorClass(evalItem.grade)}`}>
                            {evalItem.grade.toFixed(1)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                            {evalItem.weight}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-600 text-lg col-span-full text-center py-10">No hay calificaciones para este período.</p>
        )}
      </div>
    </Card>
  );
};