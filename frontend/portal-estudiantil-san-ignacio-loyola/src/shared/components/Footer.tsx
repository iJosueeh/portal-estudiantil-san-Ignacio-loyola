import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const socialLinks = [
  { name: 'Facebook', url: '#' },
  { name: 'Twitter', url: '#' },
  { name: 'Instagram', url: '#' },
];

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-10 h-10 text-secondary" />
              <span className="text-2xl font-bold font-serif">
                San Ignacio de Loyola
              </span>
            </Link>
            <p className="text-neutral-400 max-w-xs">
              Formando líderes con valores para el futuro, inspirados en una educación humanista y cristiana.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4 tracking-wide">Navegación</h3>
            <ul className="space-y-2">
              <li><Link to="/noticias" className="text-neutral-300 hover:text-white transition">Noticias</Link></li>
              <li><Link to="/admision" className="text-neutral-300 hover:text-white transition">Admisión</Link></li>
              <li><Link to="/calendario" className="text-neutral-300 hover:text-white transition">Calendario</Link></li>
              <li><Link to="/contacto" className="text-neutral-300 hover:text-white transition">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-lg mb-4 tracking-wide">Contacto</h3>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span>Av. Principal 123, Lima, Perú</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="mailto:info@sanignacio.edu.pe" className="hover:text-white transition">info@sanignacio.edu.pe</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="tel:+5112345678" className="hover:text-white transition">(+51) 1 234-5678</a>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="font-semibold text-lg mb-4 tracking-wide">Síguenos</h3>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-secondary transition">
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} Colegio Parroquial San Ignacio de Loyola.
          </p>
          <p className="text-neutral-500 text-sm mt-4 sm:mt-0">
            Diseñado con ♥ para la comunidad educativa.
          </p>
        </div>
      </div>
    </footer>
  );
};
