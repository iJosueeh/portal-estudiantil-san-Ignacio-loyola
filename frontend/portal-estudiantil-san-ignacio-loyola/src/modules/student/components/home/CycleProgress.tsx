
import { ProgressBar } from "@/shared/components/ProgressBar";
import React from "react";
import { Card } from "@/shared/components/Card";

interface CycleProgressProps {
  cycleName: string;
  progress: number;
  startDate: string;
  endDate: string;
  remainingDays: number;
}

export const CycleProgress: React.FC<CycleProgressProps> = ({
  cycleName,
  progress,
  startDate,
  endDate,
  remainingDays,
}) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Progreso del Ciclo Actual
        </h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          {cycleName}
        </span>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Completado</span>
          <span className="text-sm font-semibold text-blue-600">{progress}%</span>
        </div>
        <ProgressBar percentage={progress} color="blue" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div>
          <div className="text-xs text-gray-500 mb-1">Inicio del ciclo</div>
          <div className="text-sm font-medium text-gray-800">{startDate}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Fin del ciclo</div>
          <div className="text-sm font-medium text-gray-800">{endDate}</div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Días restantes</div>
          <div className="text-sm font-medium text-gray-800">{remainingDays} días</div>
        </div>
      </div>
    </Card>
  );
};
