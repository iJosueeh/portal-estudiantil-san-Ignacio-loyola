import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  imageUrl: string;
}

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Inicio de Clases 2025: ¡Un Nuevo Año Lleno de Aprendizaje!',
    summary: 'Damos la bienvenida a todos nuestros estudiantes para el inicio del año escolar 2025. ¡Prepárense para un viaje educativo emocionante!',
    date: '01 de Marzo, 2025',
    category: 'Académico',
    imageUrl: 'https://picsum.photos/seed/clases2025/400/250',
  },
  {
    id: '2',
    title: 'Feria de Ciencias Anual: Innovación y Creatividad en Acción',
    summary: 'Nuestros estudiantes presentaron proyectos asombrosos en la feria de ciencias, demostrando su ingenio y pasión por la investigación.',
    date: '15 de Abril, 2025',
    category: 'Eventos',
    imageUrl: 'https://picsum.photos/seed/ciencias/400/250',
  },
  {
    id: '3',
    title: 'Campaña de Reciclaje Escolar: Cuidando Nuestro Planeta',
    summary: 'Únete a nuestra iniciativa para promover la sostenibilidad y el cuidado del medio ambiente en nuestra comunidad escolar.',
    date: '20 de Mayo, 2025',
    category: 'Comunidad',
    imageUrl: 'https://picsum.photos/seed/reciclaje/400/250',
  },
  {
    id: '4',
    title: 'Celebración del Día del Maestro: Homenaje a Nuestros Educadores',
    summary: 'Un día especial para reconocer la invaluable labor de nuestros dedicados maestros. ¡Gracias por su compromiso!',
    date: '06 de Julio, 2025',
    category: 'Eventos',
    imageUrl: 'https://picsum.photos/seed/maestros/400/250',
  },
  {
    id: '5',
    title: 'Concurso de Oratoria Interescolar: Voces que Inspiran',
    summary: 'Nuestros talentosos oradores compitieron y destacaron en el concurso interescolar, llevando en alto el nombre del colegio.',
    date: '10 de Agosto, 2025',
    category: 'Académico',
    imageUrl: 'https://picsum.photos/seed/oratoria/400/250',
  },
  {
    id: '6',
    title: 'Campeonato Deportivo: Espíritu de Equipo y Competencia',
    summary: 'Nuestros equipos deportivos demostraron gran habilidad y espíritu deportivo en el campeonato anual. ¡Felicitaciones a todos los participantes!',
    date: '25 de Septiembre, 2025',
    category: 'Deportes',
    imageUrl: 'https://picsum.photos/seed/deportes/400/250',
  }
];

export const Noticias = () => {
  return (
    <div className="bg-neutral-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Noticias y Comunicados</h1>
        <p className="text-lg text-neutral-600 mb-10 text-center max-w-2xl mx-auto">
          Mantente al día con los últimos acontecimientos, eventos y anuncios importantes de nuestra comunidad escolar.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
              <div className="overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-sm text-neutral-500 mb-3">
                  <CalendarDays className="w-4 h-4" />
                  <span>{article.date}</span>
                  <span className="ml-auto px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-primary mb-2 flex-grow">{article.title}</h2>
                <p className="text-neutral-700 text-base mb-4">{article.summary}</p>
                <Link to={`/noticias/${article.id}`} className="text-accent font-semibold hover:underline flex items-center gap-2 self-start">
                  Leer más
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};