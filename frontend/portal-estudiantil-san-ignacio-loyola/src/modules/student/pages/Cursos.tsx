import React from "react";
import { BookMarked } from "lucide-react";
import { CourseCard } from "../components/courses/CourseCard";
import { coursesData } from "./_coursesData";
import { InfoBanner } from "@/shared/components/InfoBanner";
import { Card } from "@/shared/components/Card";

export const Cursos = () => {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Mis Cursos</h1>
      {/* Info banner */}
      <InfoBanner
        icon={BookMarked}
        color="blue"
        message={
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Ciclo I - En progreso:</span>{" "}
            Tienes {coursesData.length} cursos activos este ciclo. Mantén un buen ritmo de
            estudio para alcanzar tus objetivos.
          </p>
        }
      />

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </Card>
  );
};