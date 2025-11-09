import { useState } from "react";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logotipo from "../../../assets/logotipo.jpg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "estudiante@sanignacio.edu.pe" && password === "password") {
      navigate("/dashboard");
    } else {
      alert("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100 font-sans">
      <div className="w-full max-w-6xl flex h-[800px] max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden m-4">
        {/* Columna Izquierda - Branding */}
        <div 
          className="relative hidden md:flex flex-col justify-between w-1/2 p-12 text-white bg-cover bg-center"
          style={{ backgroundImage: "url('https://picsum.photos/seed/login-bg/800/1200')" }}
        >
          <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-secondary" />
              <h1 className="text-2xl font-bold font-serif tracking-wider">
                San Ignacio de Loyola
              </h1>
            </div>
            <p className="text-neutral-300 mt-2">
              Una comunidad que inspira, educa y transforma.
            </p>
          </div>
          <div className="relative z-10 space-y-4">
            <h2 className="text-5xl font-bold leading-tight">
              Bienvenido a tu
              <br />
              <span className="text-secondary">Portal Educativo.</span>
            </h2>
            <p className="text-neutral-200 text-lg max-w-md">
              Accede a tus cursos, calificaciones y calendario en un solo lugar.
            </p>
          </div>
          <div className="relative z-10 text-sm text-neutral-400">
            © {new Date().getFullYear()} Colegio Parroquial San Ignacio de Loyola. Todos los derechos reservados.
          </div>
        </div>

        {/* Columna Derecha - Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <img src={Logotipo} alt="Logo del Colegio" className="w-20 mb-4 mx-auto" />
              <h2 className="text-3xl font-bold text-neutral-800">
                Iniciar Sesión
              </h2>
              <p className="text-neutral-500 mt-2">
                Ingresa tus credenciales para acceder al portal.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-600 mb-2"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu.correo@sanignacio.edu.pe"
                    className="w-full pl-12 pr-4 py-3 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-600"
                  >
                    Contraseña
                  </label>
                  <a href="#" className="text-sm font-medium text-accent hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent"/>
                <label htmlFor="remember" className="ml-2 block text-sm text-neutral-600">
                  Mantener sesión iniciada
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-accent text-white py-3 px-4 rounded-xl font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent shadow-lg"
                >
                  Acceder al Portal
                </button>
              </div>
            </form>

            <div className="text-center mt-8">
              <p className="text-sm text-neutral-500">
                ¿Problemas para acceder?{" "}
                <a href="#" className="font-medium text-accent hover:underline">
                  Contactar a soporte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};