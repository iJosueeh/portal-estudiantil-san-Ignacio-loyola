import React from "react";
import type { ElementType } from "react";

interface InfoBannerProps {
  icon: ElementType;
  message: React.ReactNode;
  color: "primary" | "accent" | "secondary" | "red";
}

export const InfoBanner: React.FC<InfoBannerProps> = ({ icon: Icon, message, color }) => {
  const bgColors: { [key: string]: string } = {
    primary: "bg-primary/10",
    accent: "bg-accent/10",
    secondary: "bg-secondary/10",
    red: "bg-red-500/10",
  };

  const textColors: { [key: string]: string } = {
    primary: "text-primary",
    accent: "text-accent",
    secondary: "text-secondary",
    red: "text-red-600",
  };

  return (
    <div className={`flex items-center gap-3 rounded-xl p-4 ${bgColors[color]}`}>
      <Icon className={`w-5 h-5 ${textColors[color]} flex-shrink-0`} />
      <div className="flex-1">
        {message}
      </div>
    </div>
  );
};