import React from "react";

interface ProgressBarProps {
  percentage: number;
  color?: "blue" | "green" | "orange" | "purple";
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-600 to-blue-400",
    green: "from-green-600 to-green-400",
    orange: "from-orange-600 to-orange-400",
    purple: "from-purple-600 to-purple-400",
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className={`bg-gradient-to-r ${colorClasses[color]} h-3 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};