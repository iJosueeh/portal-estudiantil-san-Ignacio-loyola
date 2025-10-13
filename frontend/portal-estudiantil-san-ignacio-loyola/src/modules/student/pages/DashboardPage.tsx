
import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { DashboardHome } from "./DashboardHome";
import { Cursos } from "./Cursos";
import { Tareas } from "./Tareas";
import { Calificaciones } from "./Calificaciones";
import { Calendario } from "./Calendario";
import { Perfil } from "./Perfil";

const renderContent = (activeMenu: string) => {
  switch (activeMenu) {
    case "inicio":
      return <DashboardHome />;
    case "cursos":
      return <Cursos />;
    case "tareas":
      return <Tareas />;
    case "calificaciones":
      return <Calificaciones />;
    case "calendario":
      return <Calendario />;
    case "perfil":
      return <Perfil />;
    default:
      return <DashboardHome />;
  }
};

export const DashboardPage = () => {
  const [activeMenu, setActiveMenu] = useState("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens and conditionally for mobile */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <main className="flex-1 overflow-auto">
        <Header userName="Carlos" userGrade="5to Secundaria" toggleSidebar={toggleSidebar} />

        <div className="p-4 md:p-8">
          {renderContent(activeMenu)}
        </div>
      </main>
    </div>
  );
};
