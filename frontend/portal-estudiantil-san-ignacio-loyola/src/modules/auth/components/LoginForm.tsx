import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logotipo from "../../../assets/logotipo.jpg";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de autenticación
    if (email === "estudiante@sanignacio.edu.pe" && password === "password") {
      console.log("Login successful!");
      navigate("/dashboard"); // Redirige al dashboard
    } else {
      console.log("Login failed: Invalid credentials");
      alert("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md" data-aos="zoom-in">
        {/* Logo y título */}
        <div className="text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <img src={Logotipo} alt="Logo" className="w-24 mb-4 mx-auto block" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Portal Educativo
          </h1>
          <p className="text-gray-600">
            Colegio Parroquial San Ignacio de Loyola
          </p>
          <p className="text-gray-500 text-sm">Lima, Perú</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8" data-aos="fade-up" data-aos-delay="200">
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estudiante@sanignacio.edu.pe"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-700 transition">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Botón de inicio de sesión */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Iniciar sesión
            </button>

            {/* Soporte */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                ¿Problemas para acceder?{" "}
                <button className="text-blue-600 hover:text-blue-700 font-medium border-b border-blue-600 transition">
                  Contactar soporte
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2025 Colegio Parroquial San Ignacio de Loyola
          </p>
        </div>
      </div>
    </div>
  );
}
