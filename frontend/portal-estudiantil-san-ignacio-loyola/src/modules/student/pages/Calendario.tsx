
import React from 'react';

export const Calendario = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Calendario</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximos Eventos</h3>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{15 + index}</div>
                <div className="text-xs text-red-600 uppercase">Oct</div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Evento de Ejemplo {index + 1}</h4>
                <p className="text-sm text-gray-500">Detalles del evento</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
