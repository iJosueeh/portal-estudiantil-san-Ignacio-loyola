import { Shield, BookOpen, Users, ArrowRight, Award, UserCheck, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImgHero from '@/assets/img-hero.jpg'; // Corrected the import path

const featureCards = [
  {
    icon: <BookOpen className="w-10 h-10 text-accent" />,
    title: 'Recursos Académicos',
    description: 'Accede a materiales de clase, guías de estudio y recursos digitales.',
    link: '/dashboard/cursos',
  },
  {
    icon: <Users className="w-10 h-10 text-accent" />,
    title: 'Comunidad Escolar',
    description: 'Mantente conectado con docentes, compañeros y padres de familia.',
    link: '/noticias',
  },
  {
    icon: <Shield className="w-10 h-10 text-accent" />,
    title: 'Proceso de Admisión',
    description: 'Conoce los requisitos y postula para formar parte de nuestra familia.',
    link: '/admision',
  },
];

const stats = [
  { icon: <UserCheck className="w-8 h-8 text-secondary" />, value: '50+', label: 'Años de Trayectoria' },
  { icon: <TrendingUp className="w-8 h-8 text-secondary" />, value: '95%', label: 'Admisión Universitaria' },
  { icon: <Award className="w-8 h-8 text-secondary" />, value: '20+', label: 'Premios y Reconocimientos' },
];

const testimonials = [
  {
    quote: 'La formación en valores y la excelencia académica del colegio han sido fundamentales para el desarrollo de mis hijos. ¡Estamos muy agradecidos!',
    author: 'Familia Torres',
    role: 'Padres de Familia',
  },
  {
    quote: 'Recuerdo mis años en el colegio con mucho cariño. No solo aprendí, sino que formé amistades para toda la vida y me preparé para mis retos universitarios.',
    author: 'Ana Lucía Gómez',
    role: 'Ex-alumna, Promoción 2018',
  },
];

export const HomePage = () => {
  return (
    <div className="font-sans bg-neutral-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-celeste/20 via-neutral-100 to-white overflow-hidden min-h-[70vh] md:min-h-0 md:h-[calc(100vh-5rem)]">
        <div className="grid md:grid-cols-2 gap-8 items-center h-full">
          {/* Left Column - Text */}
          <div className="text-center md:text-left px-4 sm:px-6 md:px-8 lg:px-16 flex flex-col justify-center pt-16 md:pt-0">
            <motion.h2
              className="text-xl md:text-2xl font-semibold text-primary tracking-widest mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Colegio Parroquial San Ignacio de Loyola
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-primary tracking-tight leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Educación que <span className="text-secondary">Inspira y Transforma</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-neutral-700 max-w-2xl mx-auto md:mx-0 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Comprometidos con la formación integral de líderes con valores cristianos y excelencia académica.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                to="/admision"
                className="bg-primary text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
              >
                Únete a Nosotros
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-primary text-primary py-3 px-8 rounded-full font-semibold text-lg hover:bg-primary hover:text-white transition"
              >
                Portal Estudiantil
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            className="relative h-full hidden md:block" // Added hidden md:block
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src={ImgHero} // Using the imported local image
              alt="Estudiantes del Colegio San Ignacio de Loyola"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                maskImage: 'linear-gradient(to left, black 80%, transparent 100%)', // Adjusted mask
                WebkitMaskImage: 'linear-gradient(to left, black 80%, transparent 100%)', // Adjusted mask
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Bienvenidos a Nuestra Comunidad</h2>
            <p className="text-lg text-neutral-700 mb-4">
              Desde nuestra fundación, hemos cultivado un ambiente de fe, respeto y excelencia. Creemos en una educación que no solo imparte conocimiento, sino que también forma el carácter y el espíritu de servicio.
            </p>
            <p className="text-neutral-600">
              Nuestros estudiantes se desarrollan en un entorno seguro y estimulante, guiados por docentes apasionados y comprometidos con su éxito. Te invitamos a explorar nuestro portal y descubrir por qué somos más que un colegio: somos una familia.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl hidden md:block">
            <img src="https://picsum.photos/seed/welcome/600/400" alt="Estudiantes sonriendo" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {stat.icon}
              <p className="text-5xl font-bold mt-2">{stat.value}</p>
              <p className="text-lg text-neutral-300 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Un Portal para Toda la Comunidad</h2>
            <p className="text-neutral-500 mt-2 text-lg">Todo lo que necesitas, en un solo lugar.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-2xl font-bold text-primary mb-2">{card.title}</h3>
                <p className="text-neutral-600 mb-4">{card.description}</p>
                <Link to={card.link} className="font-semibold text-accent hover:underline flex items-center gap-2">
                  Ver más <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">Lo que Nuestra Comunidad Dice</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-neutral-100 p-8 rounded-2xl">
                <p className="text-lg text-neutral-700 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-primary">{testimonial.author}</p>
                  <p className="text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className="relative text-white rounded-2xl p-12 text-center flex flex-col items-center overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://picsum.photos/seed/students/1200/400')" }}
            >
              <div className="absolute inset-0 bg-primary bg-opacity-80"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Empezar tu Viaje Educativo?</h2>
              <p className="text-neutral-200 max-w-2xl mx-auto mb-8">
                Descubre un entorno de aprendizaje que fomenta la curiosidad, el carácter y la comunidad. Contáctanos para más información sobre nuestro proceso de admisión.
              </p>
              <Link
                to="/contacto"
                className="bg-accent text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};