import React from "react";
import { EventCard } from "../calendar/EventCard";
import { Calendar } from "lucide-react";
import type { Event } from "@/shared/types/event.types";
import { Card } from "@/shared/components/Card";

interface EventsListProps {
  events: Event[];
}

export const EventsList: React.FC<EventsListProps> = ({ events }) => {
  return (
    <Card>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold text-primary">
          Próximos Eventos
        </h3>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </Card>
  );
};