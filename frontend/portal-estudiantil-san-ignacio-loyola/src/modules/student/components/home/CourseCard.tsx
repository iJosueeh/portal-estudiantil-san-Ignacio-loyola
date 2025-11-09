import React from "react";
import type { Course } from "@/shared/types/course.types";
import { Book, MoreVertical } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const colorStyles = {
    blue: {
      bg: "bg-primary/10",
      progress: "bg-primary",
      text: "text-primary",
    },
    green: {
      bg: "bg-accent/10",
      progress: "bg-accent",
      text: "text-accent",
    },
    purple: {
      bg: "bg-purple-500/10",
      progress: "bg-purple-500",
      text: "text-purple-500",
    },
    orange: {
      bg: "bg-secondary/10",
      progress: "bg-secondary",
      text: "text-secondary",
    },
  };

  const styles = colorStyles[course.color] || colorStyles.blue;

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20 flex flex-col`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${styles.bg} ${styles.text} rounded-xl flex items-center justify-center`}>
          <Book className="w-6 h-6" />
        </div>
        <button className="text-neutral-400 hover:text-primary">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-neutral-800 mb-1">{course.name}</h3>
        <p className="text-sm text-neutral-500 mb-4">{course.professor}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-neutral-600">Progreso</span>
          <span className={`font-semibold ${styles.text}`}>
            {course.progress}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2.5">
          <div
            className={`${styles.progress} h-2.5 rounded-full`}
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
