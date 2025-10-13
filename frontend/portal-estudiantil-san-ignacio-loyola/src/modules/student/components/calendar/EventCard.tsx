import React from "react";
import type { Event } from "@/shared/types/event.types";
import { Card } from "@/shared/components/Card";

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const bgColors = {
    red: "bg-red-50 border-red-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
  };

  const textColors = {
    red: "text-red-600",
    blue: "text-blue-600",
    green: "text-green-600",
  };

  const titleColors = {
    red: "text-red-900",
    blue: "text-blue-900",
    green: "text-green-900",
  };

  const subtitleColors = {
    red: "text-red-700",
    blue: "text-blue-700",
    green: "text-green-700",
  };

  return (
    <Card className={`flex gap-4 ${bgColors[event.color]}`}>
      <div className="text-center flex-shrink-0">
        <div className={`text-2xl font-bold ${textColors[event.color]}`}>
          {event.day}
        </div>
        <div className={`text-xs ${textColors[event.color]} uppercase`}>
          {event.month}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`font-semibold text-sm ${titleColors[event.color]} mb-1`}
        >
          {event.title}
        </div>
        {event.subtitle && (
          <div className={`text-xs ${subtitleColors[event.color]}`}>
            {event.subtitle}
          </div>
        )}
        {event.time && (
          <div className={`text-xs ${subtitleColors[event.color]} mt-1`}>
            {event.time}
          </div>
        )}
      </div>
    </Card>
  );
};