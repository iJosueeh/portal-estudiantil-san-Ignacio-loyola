import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, BookOpen, GraduationCap, CheckCircle } from 'lucide-react';
import ImgAdmision from '@/assets/img-hero.jpg'; // Reusing hero image for now, can be replaced

export const Admision = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    genero: '',
    email: '',
    telefono: '',
    gradoPostula: '',
    colegioAnterior: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido.';
    if (!formData.apellido) newErrors.apellido = 'El apellido es requerido.';
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida.';
    if (!formData.genero) newErrors.genero = 'El género es requerido.';
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido.';
    if (!formData.gradoPostula) newErrors.gradoPostula = 'El grado al que postula es requerido.';
    if (!formData.colegioAnterior) newErrors.colegioAnterior = 'El colegio anterior es requerido.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario de admisión enviado:', formData);
      setIsSubmitted(true);
      // Aquí se podría enviar el formulario a un backend
    } else {
      console.log('Errores de validación:', errors);
    }
  };

  const admissionSteps = [
    {
      step: 1,
      title: 'Solicitud en Línea',
      description: 'Completa nuestro formulario de preinscripción con los datos del postulante y de contacto.',
      icon: <User className="w-8 h-8 text-primary" />,
    },
    {
      step: 2,
      title: 'Envío de Documentos',
      description: 'Adjunta los documentos requeridos (boletas, certificados, etc.) a través de nuestra plataforma.',
      icon: <BookOpen className="w-8 h-8 text-primary" />,
    },
    {
      step: 3,
      title: 'Entrevista y Evaluación',
      description: 'Coordinaremos una entrevista con el postulante y una evaluación académica si aplica.',
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
    },
    {
      step: 4,
      title: 'Resultados y Matrícula',
      description: 'Recibirás los resultados del proceso y las indicaciones para formalizar la matrícula.',
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
    },
  ];

  const requirements = [
    'Copia de DNI del postulante y de los padres.',
    'Libreta de notas del año anterior y del año en curso.',
    'Certificado de estudios de los grados anteriores.',
    'Partida de nacimiento del postulante.',
    'Constancia de no adeudo del colegio de procedencia.',
    'Ficha única de matrícula (SIAGIE).',
    'Dos fotos tamaño carné del postulante.',
  ];

  const importantDates = [
    { date: '01 Nov 2024 - 31 Dic 2024', event: 'Inicio de Preinscripciones' },
    { date: '15 Ene 2025 - 28 Feb 2025', event: 'Evaluaciones y Entrevistas' },
    { date: '05 Mar 2025', event: 'Publicación de Resultados' },
    { date: '10 Mar 2025 - 20 Mar 2025', event: 'Período de Matrícula' },
  ];


  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-accent mb-6">¡Gracias por tu interés!</h1>
        <p className="text-xl text-neutral-700 mb-4">Tu formulario de preinscripción ha sido recibido exitosamente.</p>
        <p className="text-lg text-neutral-600">Nos pondremos en contacto contigo a la brevedad para continuar con el proceso de admisión.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 bg-primary text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-neutral-100">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: `url(${ImgAdmision})` }}>
        <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Proceso de Admisión</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Únete a nuestra familia educativa. Descubre cómo formar parte del Colegio Parroquial San Ignacio de Loyola.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Nuestros Pasos para la Admisión</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center p-6 bg-neutral-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-celeste/20 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">Paso {step.step}: {step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Documentos y Requisitos</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <ul className="space-y-4 text-lg text-neutral-700">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Important Dates Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Fechas Importantes del Proceso</h2>
          <div className="max-w-3xl mx-auto bg-neutral-50 p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              {importantDates.map((item, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <Calendar className="w-8 h-8 text-secondary flex-shrink-0" />
                  <div>
                    <p className="text-xl font-semibold text-primary">{item.event}</p>
                    <p className="text-neutral-600">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admission Form Section */}
      <section className="py-20 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h1 className="text-4xl font-bold text-primary mb-4 text-center">Formulario de Preinscripción</h1>
            <p className="text-lg text-neutral-600 mb-8 text-center">
              Completa el siguiente formulario para iniciar tu proceso de preinscripción en el Colegio Parroquial San Ignacio de Loyola.
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold text-primary mb-4 border-b pb-2">Datos del Postulante</h2>
              </div>
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-2">Nombre(s)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.nombre ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="Tu nombre"
                  />
                </div>
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
              </div>
              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-neutral-700 mb-2">Apellido(s)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    id="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.apellido ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="Tu apellido"
                  />
                </div>
                {errors.apellido && <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>}
              </div>
              <div>
                <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-neutral-700 mb-2">Fecha de Nacimiento</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="date"
                    id="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.fechaNacimiento ? 'border-red-500' : 'border-transparent'}`}
                  />
                </div>
                {errors.fechaNacimiento && <p className="text-red-500 text-xs mt-1">{errors.fechaNacimiento}</p>}
              </div>
              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-neutral-700 mb-2">Género</label>
                <div className="relative">
                  <select
                    id="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    className={`w-full pl-4 pr-10 py-2 bg-neutral-100 border-2 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-accent ${errors.genero ? 'border-red-500' : 'border-transparent'}`}
                  >
                    <option value="">Selecciona</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                {errors.genero && <p className="text-red-500 text-xs mt-1">{errors.genero}</p>}
              </div>

              {/* Información de Contacto */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-2xl font-semibold text-primary mb-4 border-b pb-2">Datos de Contacto</h2>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="tu.correo@ejemplo.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-neutral-700 mb-2">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="tel"
                    id="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.telefono ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="+51 987 654 321"
                  />
                </div>
                {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
              </div>

              {/* Información Académica */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-2xl font-semibold text-primary mb-4 border-b pb-2">Información Académica</h2>
              </div>
              <div>
                <label htmlFor="gradoPostula" className="block text-sm font-medium text-neutral-700 mb-2">Grado al que Postula</label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    id="gradoPostula"
                    value={formData.gradoPostula}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.gradoPostula ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="Ej: 1er Grado de Primaria"
                  />
                </div>
                {errors.gradoPostula && <p className="text-red-500 text-xs mt-1">{errors.gradoPostula}</p>}
              </div>
              <div>
                <label htmlFor="colegioAnterior" className="block text-sm font-medium text-neutral-700 mb-2">Colegio de Procedencia</label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    id="colegioAnterior"
                    value={formData.colegioAnterior}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.colegioAnterior ? 'border-red-500' : 'border-transparent'}`}
                    placeholder="Nombre del colegio"
                  />
                </div>
                {errors.colegioAnterior && <p className="text-red-500 text-xs mt-1">{errors.colegioAnterior}</p>}
              </div>

              {/* Mensaje Adicional */}
              <div className="md:col-span-2 mt-6">
                <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-700 mb-2">Mensaje Adicional (Opcional)</label>
                <textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-neutral-100 border-2 border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="¿Hay algo más que debamos saber?"
                ></textarea>
              </div>

              {/* Botón de Envío */}
              <div className="md:col-span-2 text-center mt-8">
                <button
                  type="submit"
                  className="bg-accent text-white py-3 px-12 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Enviar Preinscripción
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
