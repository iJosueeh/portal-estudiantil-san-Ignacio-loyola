import React from "react";
import type { Course } from "@/shared/types/course.types";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const bgColors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
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
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-12 h-12 ${
            bgColors[course.color]
          } rounded-lg flex items-center justify-center text-2xl`}
        >
          {course.icon}
        </div>
      </div>
      <h4 className="font-semibold text-gray-800 mb-1">{course.name}</h4>
      <p className="text-xs text-gray-500 mb-3">{course.professor}</p>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-600">Progreso</span>
        <span className={`text-xs font-semibold ${textColors[course.color]}`}>
          {course.progress}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${progressColors[course.color]} h-2 rounded-full`}
          style={{ width: `${course.progress}%` }}
        ></div>
      </div>
    </div>
  );
};