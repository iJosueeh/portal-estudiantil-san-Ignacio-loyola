import { motion } from "framer-motion";

export const CourseGrid = () => {
  const courses = [
    { title: "Matemáticas", subtitle: "Prof. García" },
    { title: "Comunicación", subtitle: "Prof. Rodríguez" },
    { title: "Ciencia y Tecnología", subtitle: "Prof. Torres" },
    { title: "Inglés", subtitle: "Prof. Smith" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {courses.map((course, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-blue-600 text-white rounded-lg p-4 min-h-[120px] shadow-md"
        >
          <h4 className="font-semibold text-sm mb-1">{course.title}</h4>
          <p className="text-xs text-blue-100">{course.subtitle}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};