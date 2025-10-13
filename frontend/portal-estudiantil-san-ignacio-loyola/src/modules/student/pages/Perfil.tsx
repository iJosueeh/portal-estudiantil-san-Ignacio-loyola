
import React from 'react';

export const Perfil = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Mi Perfil</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-semibold">
            CM
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Carlos Mendoza</h2>
            <p className="text-gray-500">5to Secundaria</p>
            <p className="text-gray-500">carlos.mendoza@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
