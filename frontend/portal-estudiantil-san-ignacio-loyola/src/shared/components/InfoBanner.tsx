import React from "react";
import { ElementType } from "react";

interface InfoBannerProps {
  icon: ElementType;
  message: React.ReactNode; // message can be any React node
  color: "blue" | "green" | "red" | "orange";
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ icon: Icon, message, color }) => {
  const bgColors = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    red: "bg-red-50 border-red-200",
    orange: "bg-orange-50 border-orange-200",
  };

  const textColors = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
    orange: "text-orange-600",
  };

  return (
    <div className={`flex items-center gap-3 rounded-xl p-4 ${bgColors[color]}`}>
      <Icon className={`w-5 h-5 ${textColors[color]} flex-shrink-0`} />
      <div className="flex-1">
        {/* Render message directly, it's responsible for its own tags */}
        {message}
      </div>
    </div>
  );
};