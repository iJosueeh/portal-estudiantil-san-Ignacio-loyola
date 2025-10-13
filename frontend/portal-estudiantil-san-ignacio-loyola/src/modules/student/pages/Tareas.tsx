
import React from 'react';

export const Tareas = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tareas</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tareas Pendientes</h3>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Tarea de Ejemplo {index + 1}</h4>
                <p className="text-sm text-gray-500">Curso de Ejemplo</p>
              </div>
              <div className="text-sm text-gray-600">Fecha de Entrega: 25 de Octubre</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
