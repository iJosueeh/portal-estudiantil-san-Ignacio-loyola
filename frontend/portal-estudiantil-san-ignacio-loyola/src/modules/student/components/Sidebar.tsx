import {
  Home,
  BookOpen,
  ClipboardList,
  Award,
  Calendar,
  User,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import { logout } from '@/shared/utils/auth'; // Import logout function

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  { to: "/dashboard", label: "Inicio", icon: Home },
  { to: "/dashboard/cursos", label: "Mis Cursos", icon: BookOpen },
  { to: "/dashboard/tareas", label: "Tareas", icon: ClipboardList },
  { to: "/dashboard/calificaciones", label: "Calificaciones", icon: Award },
  { to: "/dashboard/calendario", label: "Calendario", icon: Calendar },
];

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const linkClasses = "flex items-center gap-4 px-4 py-3 rounded-lg transition-colors duration-200";
  const activeLinkClasses = "bg-secondary text-primary font-semibold shadow-md";
  const inactiveLinkClasses = "text-neutral-300 hover:bg-primary/50 hover:text-white";

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (isSidebarOpen) toggleSidebar(); // Close sidebar after logout
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-primary text-white flex flex-col z-40 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
      >
        {/* Logo and Close button */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-secondary" />
            <span className="text-xl font-bold font-serif tracking-wider">
              Portal PSIL
            </span>
          </div>
          <button onClick={toggleSidebar} className="md:hidden p-1 rounded-lg hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/dashboard"}
              onClick={isSidebarOpen ? toggleSidebar : undefined}
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Menu */}
        <div className="p-6 border-t border-white/10">
          <div className="space-y-2">
            <NavLink
              to="/dashboard/perfil"
              onClick={isSidebarOpen ? toggleSidebar : undefined}
              className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
            >
              <User className="w-6 h-6" />
              <span className="font-medium">Mi Perfil</span>
            </NavLink>
            <button
              onClick={handleLogout}
              className={`${linkClasses} w-full text-left ${inactiveLinkClasses} cursor-pointer`}
            >
              <LogOut className="w-6 h-6" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};