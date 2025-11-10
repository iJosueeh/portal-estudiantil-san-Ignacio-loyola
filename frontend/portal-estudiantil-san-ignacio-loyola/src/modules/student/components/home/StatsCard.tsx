import React from "react";
import type { Stats } from "@/shared/types/stats.types";

export const StatsCard: React.FC<Stats> = ({ value, label, icon: Icon, color }) => {
  const colorClasses = {
    green: "text-accent",
    blue: "text-primary",
    orange: "text-secondary",
    purple: "text-purple-600",
    red: "text-red-600", // Added red color class
  };

  const iconBgClasses = {
    green: "bg-accent/10",
    blue: "bg-primary/10",
    orange: "bg-secondary/10",
    purple: "bg-purple-600/10",
    red: "bg-red-500/10", // Added red icon background class
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClasses[color]}`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-500">{label}</p>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
      </div>
    </div>
  );
};