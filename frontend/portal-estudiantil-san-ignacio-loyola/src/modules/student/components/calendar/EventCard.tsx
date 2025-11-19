import React from "react";
import type { Event } from "@/shared/types/event.types";
import { Card } from "@/shared/components/Card";

interface EventCardProps {
  event: Event;
  onViewDetails?: () => void; // Made onViewDetails optional
}

export const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const themeColors: { [key: string]: string } = {
    blue: "text-primary",
    green: "text-accent",
    red: "text-secondary",
  };

  const themeBgColors: { [key: string]: string } = {
    blue: "bg-primary/10",
    green: "bg-accent/10",
    red: "bg-secondary/10",
  };

  const textColor = themeColors[event.color] || "text-neutral-800";
  const bgColor = themeBgColors[event.color] || "bg-neutral-100";

  return (
    <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer" onClick={onViewDetails}>
      <div className={`flex gap-4 p-4 rounded-xl ${bgColor}`}>
        <div className="text-center flex-shrink-0">
          <div className={`text-2xl font-bold ${textColor}`}>
            {event.day}
          </div>
          <div className={`text-xs ${textColor} uppercase`}>
            {event.month}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className={`font-semibold text-sm text-primary mb-1`}
          >
            {event.title}
          </div>
          {event.subtitle && (
            <div className={`text-xs text-neutral-600`}>
              {event.subtitle}
            </div>
          )}
          {event.time && (
            <div className={`text-xs text-neutral-600`}>
              {event.time}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};