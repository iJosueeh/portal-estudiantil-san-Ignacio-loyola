import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Home, Award, BookOpen, CalendarDays, Mail, LogOut, Users, X, GraduationCap, ClipboardCheck } from 'lucide-react';
import Logotipo from '@/assets/logotipo.jpg';
import { logout } from '@/shared/utils/auth'; // Import logout function

interface TeacherSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  const navItems = [
    { name: 'Inicio', icon: Home, path: '/dashboard-docente' },
    { name: 'Mis Cursos', icon: BookOpen, path: '/dashboard-docente/cursos' },
    { name: 'Revisar Tareas', icon: ClipboardCheck, path: '/dashboard-docente/revisar-tareas' }, // Corrected path
    { name: 'Calificaciones', icon: Award, path: '/dashboard-docente/calificaciones' },
    { name: 'Calendario', icon: CalendarDays, path: '/dashboard-docente/calendario' },
    { name: 'Comunicación', icon: Mail, path: '/dashboard-docente/comunicacion' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-primary text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary-dark">
          <Link to="/dashboard-docente" className="flex items-center gap-3">
            <img src={Logotipo} alt="Logo" className="h-8" />
            <span className="text-xl font-bold font-serif tracking-wider">Portal PSIL</span>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => {
            const isActive = item.path === '/dashboard-docente'
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200
                  ${isActive ? 'bg-secondary text-primary' : 'hover:bg-primary-light'}
                `}
                onClick={toggleSidebar}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-primary-dark">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-primary-light transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};
