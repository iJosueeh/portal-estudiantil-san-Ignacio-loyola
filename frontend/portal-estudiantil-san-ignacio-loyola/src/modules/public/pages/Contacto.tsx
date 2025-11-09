import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
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
    if (!formData.name) newErrors.name = 'El nombre es requerido.';
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido.';
    }
    if (!formData.subject) newErrors.subject = 'El asunto es requerido.';
    if (!formData.message) newErrors.message = 'El mensaje es requerido.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Formulario de contacto enviado:', formData);
      setIsSubmitted(true);
      // Aquí se podría enviar el formulario a un backend
    } else {
      console.log('Errores de validación:', errors);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-accent mb-6">¡Mensaje Enviado!</h1>
        <p className="text-xl text-neutral-700 mb-4">Gracias por contactarnos.</p>
        <p className="text-lg text-neutral-600">Responderemos a tu consulta a la brevedad posible.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-8 bg-primary text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-neutral-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Información de Contacto */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Contáctanos</h2>
            <p className="text-lg text-neutral-700 mb-6">
              Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros para cualquier pregunta o consulta.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-800">Correo Electrónico</h3>
                  <p className="text-neutral-600">info@sanignacio.edu.pe</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-800">Teléfono</h3>
                  <p className="text-neutral-600">(+51) 1 234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-neutral-800">Dirección</h3>
                  <p className="text-neutral-600">Av. Principal 123, Lima, Perú</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Envíanos un Mensaje</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Tu Nombre</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.name ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Nombre completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Tu Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="correo@ejemplo.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">Asunto</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.subject ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Motivo de tu consulta"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Tu Mensaje</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-2 bg-neutral-100 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent ${errors.message ? 'border-red-500' : 'border-transparent'}`}
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-primary text-center mb-12">Encuéntranos Aquí</h2>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.700266490001!2d-77.0410819851879!3d-12.06670099145799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c5f1f1f1f1f1%3A0x1f1f1f1f1f1f1f1f!2sColegio%20Parroquial%20San%20Ignacio%20de%20Loyola!5e0!3m2!1ses-419!2spe!4v1678912345678!5m2!1ses-419!2spe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del Colegio San Ignacio de Loyola"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};
