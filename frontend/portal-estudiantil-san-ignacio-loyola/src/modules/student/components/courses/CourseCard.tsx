
import React from "react";
import type { StudentCourse } from "../../types/student-course.types";
import { BookOpen, Clock, FileText, Video, Users } from "lucide-react";
import { Card } from "@/shared/components/Card";

interface CourseCardProps {
  course: StudentCourse;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const iconBgColors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
  };

  const progressColors = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
  };

  const textColors = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <Card className="hover:shadow-md transition">
      {/* Header del curso */}
      <div className="border-b border-gray-200">
        <div className="flex items-start gap-4 p-6">
          <div
            className={`w-14 h-14 ${
              iconBgColors[course.color]
            } rounded-xl flex items-center justify-center text-white flex-shrink-0`}
          >
            <BookOpen className="w-7 h-7" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {course.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{course.professor}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{course.schedule}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Próxima clase */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="text-xs font-medium text-gray-500 mb-1">
          Próxima clase:
        </div>
        <div className="text-sm font-medium text-gray-800">
          {course.nextClass}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="px-6 py-4 grid grid-cols-3 gap-4 border-b border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {course.materials}
          </div>
          <div className="text-xs text-gray-500">materiales</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
            <Video className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {course.videos}
          </div>
          <div className="text-xs text-gray-500">videos</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
            <Users className="w-4 h-4" />
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {course.students}
          </div>
          <div className="text-xs text-gray-500">estudiantes</div>
        </div>
      </div>

      {/* Progreso */}
      <div>
        <div className="flex items-center justify-between mb-3 p-6">
          <span className="text-sm text-gray-600">Progreso del curso</span>
          <span className={`text-sm font-semibold ${textColors[course.color]}`}>
            {course.progress}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`${
              progressColors[course.color]
            } h-2 rounded-full transition-all duration-300`}
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
        <div className="flex gap-2 p-6">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
            Ver Curso
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
            Materiales
          </button>
        </div>
      </div>
    </Card>
  );
};
