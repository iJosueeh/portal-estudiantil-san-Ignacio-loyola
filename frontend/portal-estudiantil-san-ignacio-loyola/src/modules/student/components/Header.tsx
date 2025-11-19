import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { getInitials } from '@/shared/utils/string';

interface HeaderProps {
  toggleSidebar: () => void;
  userName: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, userName }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
        {/* Left side: Menu button and Search */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar cursos, tareas..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Right side: Notifications and User */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-neutral-600 hover:bg-neutral-100 rounded-full transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {getInitials(userName)}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-neutral-800">{userName}</div>
              <div className="text-xs text-neutral-500">Estudiante</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};