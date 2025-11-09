import { CourseCard } from "../courses/CourseCard";
import type { Course } from "@/shared/types/course.types";
import { Card } from "@/shared/components/Card";

interface CoursesListProps {
  courses: Course[];
}

export const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  return (
    <Card>
      <h3 className="text-xl font-bold text-primary mb-6">Mis Cursos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </Card>
  );
};