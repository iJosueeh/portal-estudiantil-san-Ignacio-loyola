
import { TrendingUp, Book, FileText, Users } from "lucide-react";
import type { Stats } from "@/shared/types/stats.types";
import type { Course } from "@/shared/types/course.types";
import type { Event } from "@/shared/types/event.types";

export const statsData: Stats[] = [
  {
    id: "1",
    value: "95.0",
    label: "Promedio General",
    subtitle: "+2.5 este mes",
    icon: TrendingUp,
    color: "green",
  },
  {
    id: "2",
    value: "8",
    label: "Cursos Activos",
    subtitle: "Ciclo I - 2025",
    icon: Book,
    color: "blue",
  },
  {
    id: "3",
    value: "5",
    label: "Tareas Pendientes",
    subtitle: "2 para esta semana",
    icon: FileText,
    color: "orange",
  },
  {
    id: "4",
    value: "98%",
    label: "Asistencia",
    subtitle: "Excelente registro",
    icon: Users,
    color: "purple",
  },
];

export const coursesData: Course[] = [
  {
    id: "1",
    name: "Matemáticas",
    professor: "Prof. García",
    progress: 75,
    color: "blue",
    icon: "📘",
    teacher: {} as any, // Add dummy data to satisfy the type
    credits: 0,
    students: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Comunicación",
    professor: "Prof. Rodríguez",
    progress: 82,
    color: "green",
    icon: "📗",
    teacher: {} as any,
    credits: 0,
    students: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Ciencias Sociales",
    professor: "Prof. Silva",
    progress: 68,
    color: "purple",
    icon: "📕",
    teacher: {} as any,
    credits: 0,
    students: [],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Ciencia y Tecnología",
    professor: "Prof. López",
    progress: 90,
    color: "orange",
    icon: "📙",
    teacher: {} as any,
    credits: 0,
    students: [],
    createdAt: "",
    updatedAt: "",
  },
];

export const eventsData: Event[] = [
  {
    id: "1",
    day: "15",
    month: "Oct",
    title: "Examen de Matemáticas",
    time: "08:00 AM",
    color: "red",
  },
  {
    id: "2",
    day: "18",
    month: "Oct",
    title: "Entrega de Proyecto",
    subtitle: "Historia del Perú",
    color: "blue",
  },
  {
    id: "3",
    day: "20",
    month: "Oct",
    title: "Feria de Ciencias",
    subtitle: "Todo el día",
    color: "green",
  },
];

export const cycleProgressData = {
  cycleName: "Ciclo I",
  progress: 65,
  startDate: "01 de Marzo",
  endDate: "31 de Julio",
  remainingDays: 52,
};
