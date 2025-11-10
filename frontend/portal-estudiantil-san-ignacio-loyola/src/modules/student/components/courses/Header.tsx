import { Bell } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/shared/components/Card";

export const Header = () => {
  return (
    <Card className="p-6">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Mis Cursos</h1>
            <p className="text-sm text-gray-500">
              Ciclo I - Año Académico 2025
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
            8 cursos activos
          </div>
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              CM
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
