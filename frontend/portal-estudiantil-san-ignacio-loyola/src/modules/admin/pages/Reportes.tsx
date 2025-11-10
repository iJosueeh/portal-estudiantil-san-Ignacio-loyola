import { useState } from 'react';
import { Card } from '@/shared/components/Card';
import { FileText, Download } from 'lucide-react'; // Added Download icon
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'bar_chart' | 'pie_chart' | 'line_chart';
  data: any; // Mock data structure for the report
}

const mockReports: Report[] = [
  {
    id: 'r1',
    name: 'Estudiantes por Grado',
    description: 'Número de estudiantes matriculados por cada grado escolar.',
    type: 'bar_chart',
    data: [
      { grade: '1er Primaria', students: 50 },
      { grade: '2do Primaria', students: 48 },
      { grade: '3er Primaria', students: 52 },
      { grade: '4to Primaria', students: 45 },
      { grade: '5to Primaria', students: 55 },
      { grade: '1er Secundaria', students: 60 },
      { grade: '2do Secundaria', students: 58 },
      { grade: '3er Secundaria', students: 62 },
      { grade: '4to Secundaria', students: 57 },
      { grade: '5to Secundaria', students: 65 },
    ],
  },
  {
    id: 'r2',
    name: 'Rendimiento Académico General',
    description: 'Promedio de calificaciones por curso en el último ciclo.',
    type: 'line_chart',
    data: [
      { name: 'Matemáticas III', 'Ciclo I': 15.2, 'Ciclo II': 14.8, 'Ciclo III': 15.5 },
      { name: 'Historia Universal', 'Ciclo I': 14.8, 'Ciclo II': 15.0, 'Ciclo III': 15.2 },
      { name: 'Literatura Española', 'Ciclo I': 16.1, 'Ciclo II': 16.5, 'Ciclo III': 16.0 },
      { name: 'Ciencias Naturales', 'Ciclo I': 15.5, 'Ciclo II': 15.8, 'Ciclo III': 16.2 },
      { name: 'Inglés Avanzado', 'Ciclo I': 17.0, 'Ciclo II': 17.2, 'Ciclo III': 17.5 },
    ],
  },
  {
    id: 'r3',
    name: 'Distribución de Calificaciones (Matemáticas III)',
    description: 'Distribución porcentual de calificaciones en Matemáticas III.',
    type: 'pie_chart',
    data: [
      { name: 'Sobresaliente (18-20)', value: 20, color: '#2A9D8F' }, // accent
      { name: 'Notable (14-17)', value: 50, color: '#F4A261' }, // secondary
      { name: 'Aprobado (11-13)', value: 20, color: '#1D3557' }, // primary
      { name: 'Desaprobado (0-10)', value: 10, color: '#E76F51' }, // custom red
    ],
  },
  {
    id: 'r4',
    name: 'Actividad Docente',
    description: 'Comparativa de tareas revisadas y mensajes enviados por docente.',
    type: 'bar_chart', // Changed to bar_chart
    data: [
      { teacher: 'Prof. Ana García', tasksReviewed: 120, messagesSent: 35, totalInteractions: 155 },
      { teacher: 'Prof. Carlos Pérez', tasksReviewed: 95, messagesSent: 28, totalInteractions: 123 },
      { teacher: 'Prof. Sofía Rojas', tasksReviewed: 110, messagesSent: 40, totalInteractions: 150 },
      { teacher: 'Prof. Laura Castillo', tasksReviewed: 80, messagesSent: 20, totalInteractions: 100 },
    ],
  },
];

export const Reportes = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleDownloadReport = () => {
    if (selectedReport) {
      alert(`Descargando reporte: ${selectedReport.name}`);
      // In a real application, this would trigger a file download
    }
  };

  const renderTable = (data: any[]) => (
    <div className="overflow-x-auto mt-8 rounded-lg shadow-md border border-neutral-200">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-primary">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {data.map((row: any, index: number) => (
            <tr key={index} className="hover:bg-neutral-50 transition-colors">
              {Object.values(row).map((value: any, idx: number) => (
                <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderReportContent = () => {
    if (!selectedReport) {
      return (
        <p className="text-neutral-600 text-lg text-center py-10">
          Selecciona un reporte de la lista para visualizarlo.
        </p>
      );
    }

    let chartBars;
    if (selectedReport.id === 'r4') {
      chartBars = (
        <>
          <Bar dataKey="tasksReviewed" fill="#1D3557" name="Tareas Revisadas" /> {/* primary */}
          <Bar dataKey="messagesSent" fill="#F4A261" name="Mensajes Enviados" /> {/* secondary */}
          <Bar dataKey="totalInteractions" fill="#2A9D8F" name="Total Interacciones" /> {/* accent */}
        </>
      );
    } else if (selectedReport.id === 'r1') {
      chartBars = <Bar dataKey="students" fill="#1D3557" name="Estudiantes" />; {/* primary */}
    }

    return (
      <div className="space-y-8">
        {selectedReport.type === 'bar_chart' && (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedReport.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={selectedReport.id === 'r1' ? 'grade' : 'teacher'} />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartBars}
              </BarChart>
            </ResponsiveContainer>
            {renderTable(selectedReport.data)}
          </>
        )}

        {selectedReport.type === 'pie_chart' && (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={selectedReport.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {selectedReport.data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            {renderTable(selectedReport.data)}
          </>
        )}

        {selectedReport.type === 'line_chart' && (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={selectedReport.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(selectedReport.data[0]).filter(key => key !== 'name').map((key, index) => (
                  <Line key={key} type="monotone" dataKey={key} stroke={['#1D3557', '#F4A261', '#2A9D8F'][index % 3]} activeDot={{ r: 8 }} />
                ))}
              </LineChart>
            </ResponsiveContainer>
            {renderTable(selectedReport.data)}
          </>
        )}

        {selectedReport.type === 'table' && (
          renderTable(selectedReport.data)
        )}
      </div>
    );
  };

  return (
    <Card className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-8">Reportes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report List */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2">Reportes Disponibles</h2>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center gap-3
                  ${selectedReport?.id === report.id ? 'bg-secondary text-primary' : 'hover:bg-neutral-100 text-neutral-800'}
                `}
              >
                <FileText className="w-5 h-5" />
                <span>{report.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Report Viewer */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-2xl font-bold text-primary">
              {selectedReport ? selectedReport.name : 'Visualizador de Reportes'}
            </h2>
            {selectedReport && (
              <button
                onClick={handleDownloadReport}
                className="bg-accent text-white py-2 px-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition"
              >
                <Download className="w-5 h-5" /> Descargar
              </button>
            )}
          </div>
          {renderReportContent()}
        </div>
      </div>
    </Card>
  );
};
