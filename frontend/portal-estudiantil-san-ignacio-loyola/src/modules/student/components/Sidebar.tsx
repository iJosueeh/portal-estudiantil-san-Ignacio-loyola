import {
  Home,
  BookOpen,
  ClipboardList,
  Award,
  Calendar,
  User,
  X,
} from "lucide-react";
import React from "react";
import type { LucideIcon } from "lucide-react"; // Import LucideIcon as a type

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "cursos", label: "Mis Cursos", icon: BookOpen },
  { id: "tareas", label: "Tareas", icon: ClipboardList },
  { id: "calificaciones", label: "Calificaciones", icon: Award },
  { id: "calendario", label: "Calendario", icon: Calendar },
  { id: "perfil", label: "Mi Perfil", icon: User },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  isSidebarOpen,
  toggleSidebar,
}) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg flex flex-col z-40 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex`}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
              📚
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">Portal PSIL</h2>
              <p className="text-xs text-gray-500">Estudiante</p>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (isSidebarOpen) toggleSidebar(); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeMenu === item.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="text-xs text-gray-500 mb-2">Año Académico 2025</div>
          <div className="text-xs text-gray-600 font-medium">
            Ciclo I - En progreso
          </div>
        </div>
      </div>
    </>
  );
};