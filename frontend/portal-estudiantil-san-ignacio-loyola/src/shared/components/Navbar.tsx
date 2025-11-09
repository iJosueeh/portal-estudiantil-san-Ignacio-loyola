import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Menu, X } from 'lucide-react';

const navLinks = [
  { title: 'Inicio', path: '/' },
  { title: 'Noticias', path: '/noticias' },
  { title: 'Admisión', path: '/admision' },
  { title: 'Contacto', path: '/contacto' },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-primary font-serif">
              San Ignacio de Loyola
            </span>
          </Link>

          {/* Navegación para Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="text-neutral-600 font-medium hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Botones de Acción */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="bg-primary text-white py-2 px-5 rounded-full font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105"
            >
              Acceso Portal
            </Link>
          </div>

          {/* Botón de Menú para Móvil */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú para Móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4">
          <nav className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="text-neutral-600 font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Link
              to="/login"
              className="bg-primary text-white py-2 px-5 rounded-full font-semibold hover:bg-opacity-90 transition-transform transform hover:scale-105 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Acceso Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
