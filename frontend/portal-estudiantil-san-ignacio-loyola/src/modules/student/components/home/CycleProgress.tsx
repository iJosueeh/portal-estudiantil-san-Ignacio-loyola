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
        <h3 className="text-xl font-bold text-primary">
          Progreso del Ciclo Actual
        </h3>
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
          {cycleName}
        </span>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-md text-neutral-600">Completado</span>
          <span className="text-md font-bold text-primary">{progress}%</span>
        </div>
        <ProgressBar percentage={progress} color="primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 border-t border-neutral-200 pt-4">
        <div>
          <div className="text-sm text-neutral-500 mb-1">Inicio del ciclo</div>
          <div className="text-md font-semibold text-neutral-800">{startDate}</div>
        </div>
        <div>
          <div className="text-sm text-neutral-500 mb-1">Fin del ciclo</div>
          <div className="text-md font-semibold text-neutral-800">{endDate}</div>
        </div>
        <div>
          <div className="text-sm text-neutral-500 mb-1">Días restantes</div>
          <div className="text-md font-semibold text-neutral-800">{remainingDays} días</div>
        </div>
      </div>
    </Card>
  );
};