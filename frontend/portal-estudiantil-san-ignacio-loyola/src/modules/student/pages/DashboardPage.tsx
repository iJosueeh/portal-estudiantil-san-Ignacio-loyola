import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { WelcomeBanner } from "../components/WelcomeBanner";
import { StatsCard } from "../components/StatsCard";
import { ProgressSection } from "../components/ProgressSection";
import { EventsSection } from "../components/EventsSection";
import { CourseGrid } from "../components/CourseGrid";
import {
  FileText,
  User,
  CheckCircle,
  XCircle,
  Church,
  Award,
  Shield,
} from "lucide-react";

interface StudentData {
  name: string;
  level: string;
  grade: string;
  average: string;
}

const studentData: StudentData = {
  name: "Carlos Mendoza",
  level: "5to Secundaria",
  grade: "Grado B",
  average: "16.5",
};

const statsItems = [
  { id: 1, icon: <FileText size={22} />, value: "95%", label: "Asistencia", color: "green" as const },
  { id: 2, icon: <User size={22} />, value: "12", label: "Cursos matriculados", color: "orange" as const },
  { id: 3, icon: <CheckCircle size={22} />, value: "24", label: "Tareas completadas", color: "pink" as const },
  { id: 4, icon: <XCircle size={22} />, value: "3", label: "Tareas pendientes", color: "red" as const },
];

const progressData = {
  progress: 65,
  nextEvaluation: {
    subject: "Matemáticas",
    date: "12 de Abril",
  },
};

const eventsData = [
  {
    id: 1,
    title: "Misa Escolar",
    subtitle: "Viernes 15 de Abril - 8:00 AM",
    icon: Church,
    iconBgColor: "bg-sky-500",
  },
  {
    id: 2,
    title: "Campeonato de Ajedrez",
    subtitle: "Martes 20 de Abril - 10:30 AM",
    icon: Award,
    iconBgColor: "bg-amber-500",
  },
  {
    id: 3,
    title: "Simulacro de Evacuación",
    subtitle: "Jueves 22 de Abril - 9:00 AM",
    icon: Shield,
    iconBgColor: "bg-red-500",
  },
];

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("panel");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen} 
      />
      <div className="flex-1 flex flex-col">
        <Header 
          studentData={studentData} 
          setSidebarOpen={setSidebarOpen} 
        />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-5">
            <WelcomeBanner studentData={studentData} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {statsItems.map((item) => (
                <StatsCard
                  key={item.id}
                  icon={item.icon}
                  value={item.value}
                  label={item.label}
                  color={item.color}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <ProgressSection
                progress={progressData.progress}
                nextEvaluation={progressData.nextEvaluation}
              />
              <EventsSection events={eventsData} />
            </div>
            <CourseGrid />
          </div>
        </main>
      </div>
    </div>
  );
};