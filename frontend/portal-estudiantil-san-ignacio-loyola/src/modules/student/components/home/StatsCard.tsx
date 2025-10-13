import React from "react";
import type { Stats } from "@/shared/types/stats.types";
import { Card } from "@/shared/components/Card";

export const StatsCard: React.FC<Stats> = ({ value, label, subtitle, icon: Icon, color }) => {
  const colorClasses = {
    green: "from-green-50 to-green-100 border-green-300",
    blue: "from-blue-50 to-blue-100 border-blue-300",
    orange: "from-orange-50 to-orange-100 border-orange-300",
    purple: "from-purple-50 to-purple-100 border-purple-300",
  };

  const iconBgClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    purple: "bg-purple-500",
  };

  const textClasses = {
    green: "text-green-700",
    blue: "text-blue-700",
    orange: "text-orange-700",
    purple: "text-purple-700",
  };

  const subtitleClasses = {
    green: "text-green-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
  };
  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${iconBgClasses[color]} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className={`text-3xl font-bold ${textClasses[color]} mb-1`}>
        {value}
      </div>
      <div className={`text-sm ${subtitleClasses[color]} font-medium`}>
        {label}
      </div>
      <div className={`text-xs ${subtitleClasses[color]} mt-2`}>{subtitle}</div>
    </Card>
  );
};