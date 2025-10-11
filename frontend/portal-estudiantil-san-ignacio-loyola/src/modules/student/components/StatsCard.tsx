import type { ReactNode } from "react";
import { motion } from "framer-motion";

type CardColor = "green" | "orange" | "pink" | "red";

interface StatsCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  color: CardColor;
}

const colorMap: Record<CardColor, string> = {
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-700",
  pink: "bg-pink-100 text-pink-700",
  red: "bg-red-100 text-red-700",
};

export const StatsCard = ({ icon, value, label, color }: StatsCardProps) => {
  const colorClass = colorMap[color] || "bg-gray-100 text-gray-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
      className={`${colorClass} rounded-lg p-5 shadow-sm`}
    >
      <div className="flex items-center gap-3">
        <div className="bg-white/70 rounded-lg w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs font-medium">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};