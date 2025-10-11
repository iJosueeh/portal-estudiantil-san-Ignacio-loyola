import type { Dispatch, SetStateAction } from 'react';
import { User, Menu } from 'lucide-react';

interface StudentData {
  name: string;
  level: string;
  grade: string;
}

// Se añade la prop `setSidebarOpen` para poder abrir el menú desde el Header
interface HeaderProps {
  studentData: StudentData;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const UserProfile = ({ studentData }: { studentData: StudentData }) => (
  <div className="flex items-center gap-3">
    <div className="text-right">
      <p className="text-sm font-semibold text-gray-800">{studentData.name}</p>
      <p className="text-xs text-gray-500">{`${studentData.level} - ${studentData.grade}`}</p>
    </div>
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
      <User className="text-blue-700" size={20} />
    </div>
  </div>
);

export const Header = ({ studentData, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white border-b shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Botón de Hamburguesa visible solo en pantallas pequeñas (hasta lg) */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1 -ml-1 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <Menu size={24} />
        </button>
        {/* El título se oculta en pantallas muy pequeñas para dar espacio */}
        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-blue-900">Portal Estudiantil</h1>
          <p className="text-xs text-gray-500">Colegio Parroquial San Ignacio de Loyola</p>
        </div>
      </div>
      <UserProfile studentData={studentData} />
    </header>
  );
};