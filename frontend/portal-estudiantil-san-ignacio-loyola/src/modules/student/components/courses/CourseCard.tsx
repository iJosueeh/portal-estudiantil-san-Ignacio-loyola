import React from "react";
import type { StudentCourse } from "../../types/student-course.types";
import { BookOpen, Clock, FileText, Video, Users } from "lucide-react";
import { Card } from "@/shared/components/Card";
import { Link } from "react-router-dom"; // Import Link

interface CourseCardProps {
  course: StudentCourse;
  // Removed onViewMaterials prop
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => { // Removed onViewMaterials from destructuring
  const iconBgColors: { [key: string]: string } = {
    blue: "bg-primary/10",
    green: "bg-accent/10",
    purple: "bg-celeste/10",
    orange: "bg-secondary/10",
  };

  const progressColors: { [key: string]: string } = {
    blue: "bg-primary",
    green: "bg-accent",
    purple: "bg-celeste",
    orange: "bg-secondary",
  };

  const textColors: { [key: string]: string } = {
    blue: "text-primary",
    green: "text-accent",
    purple: "text-celeste",
    orange: "text-secondary",
  };

  return (
    <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Header del curso */}
      <div className="border-b border-neutral-200">
        <div className="flex items-start gap-4 p-6">
          <div
            className={`w-14 h-14 ${
              iconBgColors[course.color]
            } rounded-xl flex items-center justify-center ${textColors[course.color]} flex-shrink-0`}
          >
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary mb-1">
              {course.name}
            </h3>
            <p className="text-sm text-neutral-600 mb-2">{course.professor}</p>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Clock className="w-4 h-4" />
              <span>{course.schedule}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Próxima clase */}
      <div className="px-6 py-4 bg-neutral-50">
        <div className="text-xs font-medium text-neutral-500 mb-1">
          Próxima clase:
        </div>
        <div className="text-sm font-medium text-neutral-800">
          {course.nextClass}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="px-6 py-4 grid grid-cols-3 gap-4 border-b border-neutral-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-neutral-800">
            {course.materials}
          </div>
          <div className="text-xs text-neutral-500">materiales</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
            <Video className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-neutral-800">
            {course.videos}
          </div>
          <div className="text-xs text-neutral-500">videos</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-neutral-800">
            {course.students}
          </div>
          <div className="text-xs text-neutral-500">estudiantes</div>
        </div>
      </div>

      {/* Progreso */}
      <div>
        <div className="flex items-center justify-between mb-3 p-6">
          <span className="text-sm text-neutral-600">Progreso del curso</span>
          <span className={`text-sm font-semibold ${textColors[course.color]}`}>
            {course.progress}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2 mb-4">
          <div
            className={`${
              progressColors[course.color]
            } h-2 rounded-full transition-all duration-300`}
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <div className="flex gap-2 p-6">
          <Link
            to={`/dashboard/cursos/${course.id}`} // Navigate to course details page
            className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition text-sm font-medium text-center"
          >
            Ver Curso
          </Link>
          <Link
            to={`/dashboard/cursos/${course.id}/materiales`} // Navigate to course materials page
            className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition text-sm font-medium text-center"
          >
            Materiales
          </Link>
        </div>
      </div>
    </Card>
  );
};
