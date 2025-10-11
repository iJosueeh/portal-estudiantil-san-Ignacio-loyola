import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { ElementType } from "react";

// --- Tipos y Datos ---
interface Event {
  id: number;
  title: string;
  subtitle: string;
  icon: ElementType;
  iconBgColor: string;
}

interface EventsSectionProps {
  events: Event[];
}

interface EventItemProps {
  event: Event;
  index: number;
}

const EventItem = ({ event, index }: EventItemProps) => {
  const Icon = event.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-3"
    >
      <div
        className={`w-10 h-10 ${event.iconBgColor} rounded-lg flex-shrink-0 flex items-center justify-center`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">{event.title}</h4>
        <p className="text-xs text-gray-500">{event.subtitle}</p>
      </div>
    </motion.div>
  );
};

export const EventsSection = ({ events }: EventsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
          <Calendar size={14} className="text-yellow-600" />
        </div>
        <h3 className="text-base font-bold text-gray-800">Próximos eventos</h3>
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <EventItem key={event.id} event={event} index={index} />
        ))}
      </div>
    </motion.div>
  );
};