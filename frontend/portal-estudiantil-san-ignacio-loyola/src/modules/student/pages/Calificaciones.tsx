
import React from 'react';

export const Calificaciones = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Calificaciones</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Calificaciones por Curso</h3>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">Curso de Ejemplo {index + 1}</h4>
                <p className="text-sm text-gray-500">Profesor de Ejemplo</p>
              </div>
              <div className="text-lg font-bold text-blue-600">18.5</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
