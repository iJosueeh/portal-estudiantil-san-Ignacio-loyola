import React from 'react';
import { Card } from '@/shared/components/Card';
import { Users, BookOpen, CalendarDays, BarChart2, Mail, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../../student/components/home/StatsCard'; // Reusing student's StatsCard

// Mock Data for Admin Dashboard
interface AdminDashboardData {
  adminName: string;
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  upcomingEvents: number;
  systemAlerts: number;
  recentActivities: { id: string; description: string; date: string }[];
}

const mockAdminData: AdminDashboardData = {
  adminName: 'Administrador Principal',
  totalStudents: 520,
  totalTeachers: 35,
  totalCourses: 15,
  upcomingEvents: 7,
  systemAlerts: 2,
  recentActivities: [
    { id: 'act1', description: 'Nuevo estudiante registrado: Juan Pérez', date: '2025-11-07' },
    { id: 'act2', description: 'Curso "Matemáticas III" actualizado por Prof. Ana García', date: '2025-11-06' },
    { id: 'act3', description: 'Evento "Día de la Familia" creado', date: '2025-11-05' },
  ],
};

export const DashboardAdminHome = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="p-6">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Bienvenido, {mockAdminData.adminName}
        </h1>
        <p className="text-neutral-600">
          Aquí tienes un resumen general del sistema.
        </p>
      </Card>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          value={mockAdminData.totalStudents.toString()}
          label="Total Estudiantes"
          icon={Users}
          color="blue"
        />
        <StatsCard
          value={mockAdminData.totalTeachers.toString()}
          label="Total Docentes"
          icon={Users}
          color="green"
        />
        <StatsCard
          value={mockAdminData.totalCourses.toString()}
          label="Total Cursos"
          icon={BookOpen}
          color="purple"
        />
        <StatsCard
          value={mockAdminData.upcomingEvents.toString()}
          label="Próximos Eventos"
          icon={CalendarDays}
          color="orange"
        />
      </div>

      {/* System Alerts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" /> Alertas del Sistema
          </h2>
          {mockAdminData.systemAlerts > 0 ? (
            <p className="text-red-600">Tienes {mockAdminData.systemAlerts} alertas pendientes.</p>
          ) : (
            <p className="text-green-600">No hay alertas del sistema.</p>
          )}
          <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded-full text-sm hover:bg-red-600 transition">
            Ver Alertas
          </button>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            {mockAdminData.recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 text-neutral-700">
                <Mail className="w-5 h-5 text-accent" />
                <p className="text-sm">
                  <span className="font-semibold">{activity.description}</span> - {activity.date}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
