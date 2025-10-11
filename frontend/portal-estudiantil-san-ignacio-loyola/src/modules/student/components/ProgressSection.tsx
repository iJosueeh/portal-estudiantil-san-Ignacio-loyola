import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <div>
    <div className="flex justify-between text-xs mb-2">
      <span className="text-gray-600">Avance del bimestre</span>
      <span className="font-bold text-gray-800">{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-blue-600 h-full"
      />
    </div>
  </div>
);

interface NextEvaluation {
  subject: string;
  date: string;
}

interface ProgressSectionProps {
  progress: number;
  nextEvaluation: NextEvaluation;
}

export const ProgressSection = ({ progress, nextEvaluation }: ProgressSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-sm p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
          <Calendar size={14} className="text-blue-700" />
        </div>
        <h3 className="text-base font-bold text-gray-800">
          Progreso del ciclo actual
        </h3>
      </div>

      <div className="mb-3">
        <ProgressBar progress={progress} />
      </div>

      <div className="bg-blue-50 rounded p-3">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Siguiente evaluación:</span> {nextEvaluation.subject} - {nextEvaluation.date}
        </p>
      </div>
    </motion.div>
  );
};