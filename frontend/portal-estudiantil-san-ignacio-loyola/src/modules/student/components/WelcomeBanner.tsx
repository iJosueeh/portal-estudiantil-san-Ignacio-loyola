import { motion } from "framer-motion";
import { User } from "lucide-react";

interface StudentData {
  name: string;
  level: string;
  grade: string;
  average: string;
}

interface WelcomeBannerProps {
  studentData: StudentData;
}

const AverageScore = ({ average }: { average: string }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.3, duration: 0.5 }}
    className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg px-5 py-3 text-center min-w-[100px]"
  >
    <User size={28} className="mx-auto mb-1 text-blue-800" />
    <div className="text-2xl font-bold text-blue-900">{average}</div>
    <div className="text-xs text-blue-700">Promedio General</div>
  </motion.div>
);

export const WelcomeBanner = ({ studentData }: WelcomeBannerProps) => {
  const firstName = studentData.name.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-lg p-6 text-white shadow-md"
    >
      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-bold mb-1">¡Bienvenido {firstName}!</h2>
          <p className="text-sm text-blue-100">{`${studentData.level} - ${studentData.grade}`}</p>
          <p className="text-xs text-blue-200">Año escolar 2025</p>
        </div>
        <AverageScore average={studentData.average} />
      </div>
    </motion.div>
  );
};