import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { User, Edit, Save, CheckCircle, XCircle } from 'lucide-react'; // Added CheckCircle, XCircle
import { Modal } from '@/shared/components/Modal'; // Import Modal component

interface StudentGrade {
  id: string;
  name: string;
  evaluations: {
    [evaluationName: string]: number | null; // e.g., 'Parcial 1': 15, 'Final': 18
  };
  finalGrade: number | null;
}

interface CourseGrades {
  courseId: string;
  courseName: string;
  evaluationsStructure: string[]; // e.g., ['Parcial 1', 'Parcial 2', 'Final']
  students: StudentGrade[];
}

const mockTeacherGrades: CourseGrades[] = [
  {
    courseId: 'math3',
    courseName: 'Matemáticas III',
    evaluationsStructure: ['Parcial 1', 'Parcial 2', 'Proyecto', 'Final'],
    students: [
      { id: 's1', name: 'Sofía Rodríguez', evaluations: { 'Parcial 1': 16, 'Parcial 2': 14, 'Proyecto': 18, 'Final': null }, finalGrade: null },
      { id: 's2', name: 'Pedro Gómez', evaluations: { 'Parcial 1': 12, 'Parcial 2': 10, 'Proyecto': 15, 'Final': null }, finalGrade: null },
      { id: 's3', name: 'Ana Torres', evaluations: { 'Parcial 1': 18, 'Parcial 2': 17, 'Proyecto': 19, 'Final': null }, finalGrade: null },
    ],
  },
  {
    courseId: 'hist1',
    courseName: 'Historia Universal',
    evaluationsStructure: ['Examen 1', 'Ensayo', 'Participación', 'Final'],
    students: [
      { id: 's4', name: 'Carlos Mendoza', evaluations: { 'Examen 1': 14, 'Ensayo': 16, 'Participación': 18, 'Final': null }, finalGrade: null },
      { id: 's5', name: 'Laura Pérez', evaluations: { 'Examen 1': 17, 'Ensayo': 19, 'Participación': 19, 'Final': null }, finalGrade: null },
    ],
  },
];

export const GestionarCalificaciones = () => {
  const [selectedCourseId, setSelectedCourseId] = useState(mockTeacherGrades[0]?.courseId || '');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [currentGrades, setCurrentGrades] = useState<{ [evaluationName: string]: number | null }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);
  const [modalMessage, setModalMessage] = useState('');

  const currentCourse = mockTeacherGrades.find(course => course.courseId === selectedCourseId);

  const openModal = (type: typeof modalType, message: string) => {
    setModalType(type);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setModalMessage('');
  };

  const handleEditClick = (student: StudentGrade) => {
    setEditingStudentId(student.id);
    setCurrentGrades(student.evaluations);
  };

  const handleGradeChange = (evaluationName: string, value: string) => {
    const grade = value === '' ? null : parseFloat(value);
    setCurrentGrades(prev => ({ ...prev, [evaluationName]: grade }));
  };

  const handleSaveGrades = (studentId: string) => {
    // In a real app, you'd send this data to a backend
    const updatedMockTeacherGrades = mockTeacherGrades.map(course => {
      if (course.courseId === selectedCourseId) {
        const updatedStudents = course.students.map(student => {
          if (student.id === studentId) {
            const newEvaluations = { ...currentGrades };
            // Simple final grade calculation (average of available grades)
            const gradesArray = Object.values(newEvaluations).filter(g => g !== null) as number[];
            const newFinalGrade = gradesArray.length > 0
              ? parseFloat((gradesArray.reduce((sum, g) => sum + g, 0) / gradesArray.length).toFixed(1))
              : null;

            return { ...student, evaluations: newEvaluations, finalGrade: newFinalGrade };
          }
          return student;
        });
        return { ...course, students: updatedStudents };
      }
      return course;
    });
    // This would update the global mock data, but for a real app, it's a backend call
    // For now, we just exit editing mode
    console.log('Grades saved:', updatedMockTeacherGrades);
    setEditingStudentId(null);
    openModal('success', 'Calificaciones guardadas con éxito!');
  };

  const getGradeColorClass = (grade: number | null) => {
    if (grade === null) return 'text-neutral-500';
    if (grade >= 14) return 'text-green-600';
    if (grade >= 11) return 'text-orange-600';
    return 'text-red-600';
  };

  const renderModalContent = () => {
    return (
      <div className="flex flex-col items-center justify-center text-center p-4">
        {modalType === 'success' && <CheckCircle className="w-16 h-16 text-green-500 mb-4" />}
        {modalType === 'error' && <XCircle className="w-16 h-16 text-red-500 mb-4" />}
        <p className="text-lg text-neutral-700">{modalMessage}</p>
      </div>
    );
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'success': return 'Éxito';
      case 'error': return 'Error';
      default: return '';
    }
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Gestionar Calificaciones</h1>

      <div className="mb-6">
        <label htmlFor="course-select" className="block text-sm font-medium text-neutral-700 mb-2">
          Seleccionar Curso:
        </label>
        <select
          id="course-select"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
        >
          {mockTeacherGrades.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {currentCourse ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-primary">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Estudiante
                </th>
                {currentCourse.evaluationsStructure.map(evalName => (
                  <th key={evalName} scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {evalName}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Nota Final
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {currentCourse.students.map(student => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> {student.name}
                  </td>
                  {currentCourse.evaluationsStructure.map(evalName => (
                    <td key={evalName} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-800">
                      {editingStudentId === student.id ? (
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={currentGrades[evalName] === null ? '' : currentGrades[evalName]!}
                          onChange={(e) => handleGradeChange(evalName, e.target.value)}
                          className="w-20 px-2 py-1 border rounded-md focus:ring-2 focus:ring-accent"
                        />
                      ) : (
                        <span className={getGradeColorClass(student.evaluations[evalName])}>
                          {student.evaluations[evalName] === null ? '-' : student.evaluations[evalName]?.toFixed(1)}
                        </span>
                      )}
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                    <span className={getGradeColorClass(student.finalGrade)}>
                      {student.finalGrade === null ? '-' : student.finalGrade.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {editingStudentId === student.id ? (
                      <button
                        onClick={() => handleSaveGrades(student.id)}
                        className="text-green-600 hover:text-green-900 transition flex items-center gap-1"
                      >
                        <Save className="w-4 h-4" /> Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(student)}
                        className="text-indigo-600 hover:text-indigo-900 transition flex items-center gap-1"
                      >
                        <Edit className="w-4 h-4" /> Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-neutral-600 text-lg col-span-full text-center py-10">Selecciona un curso para gestionar calificaciones.</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={getModalTitle()}
        hideFooter={true}
      >
        {renderModalContent()}
      </Modal>
    </Card>
  );
};