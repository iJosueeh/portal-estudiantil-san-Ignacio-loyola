import React, { useState } from "react";
import { motion } from "framer-motion";
import Logotipo from "../../../assets/logotipo.jpg";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    tipoUsuario: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // authService.login(formData)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-md text-center"
      >
        <motion.img
          src={Logotipo}
          alt="Logo Colegio"
          className="mx-auto mb-4 w-24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-blue-900 mb-1">
            Portal Educativo
          </h2>
          <p className="text-gray-600 mb-6">
            Colegio Parroquial San Ignacio de Loyola
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-gray-700 mb-1">Tipo de Usuario</label>
            <select
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Selecciona</option>
              <option value="alumno">Alumno</option>
              <option value="docente">Docente</option>
              <option value="administrador">Administrador</option>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Iniciar Sesión
          </motion.button>
        </form>

        <motion.p
          className="mt-4 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          ¿Te olvidaste la contraseña?{" "}
          <a href="#" className="text-blue-700 font-medium hover:underline">
            Recuperar aquí
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}