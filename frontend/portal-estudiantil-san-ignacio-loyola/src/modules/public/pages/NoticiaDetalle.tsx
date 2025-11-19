import { useParams, Link } from 'react-router-dom';
import { CalendarDays, ArrowLeft } from 'lucide-react';

// For simplicity, we'll redefine the mock data here. In a real app, this would come from a shared service or API.
interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string; // Added full content
  date: string;
  category: string;
  imageUrl: string;
}

const mockNews: NewsArticle[] = [
    {
        id: '1',
        title: 'Inicio de Clases 2025: ¡Un Nuevo Año Lleno de Aprendizaje!',
        summary: 'Damos la bienvenida a todos nuestros estudiantes para el inicio del año escolar 2025. ¡Prepárense para un viaje educativo emocionante!',
        content: `
          <p>El pasado lunes, las puertas de nuestro colegio se abrieron para recibir con alegría a nuestros estudiantes en el primer día del año escolar 2025. Los pasillos volvieron a llenarse de risas, reencuentros y la energía de nuevos comienzos.</p>
          <p>Durante la ceremonia de bienvenida, nuestro director, el Padre Miguel, compartió un mensaje de esperanza y motivación, animando a los estudiantes a perseguir sus metas con dedicación y a vivir nuestros valores ignacianos en su día a día. "Este año es una nueva página en blanco. Llenémosla de conocimiento, amistad y servicio a los demás", expresó.</p>
          <p>Los tutores de cada grado prepararon actividades de integración para fomentar el compañerismo y presentar los objetivos académicos del año. Estamos seguros de que, con el esfuerzo de todos —estudiantes, docentes y padres de familia—, este será un año de grandes logros y crecimiento personal.</p>
        `,
        date: '01 de Marzo, 2025',
        category: 'Académico',
        imageUrl: 'https://picsum.photos/seed/clases2025/800/400',
      },
      {
        id: '2',
        title: 'Feria de Ciencias Anual: Innovación y Creatividad en Acción',
        summary: 'Nuestros estudiantes presentaron proyectos asombrosos en la feria de ciencias, demostrando su ingenio y pasión por la investigación.',
        content: `
          <p>La creatividad y el espíritu científico de nuestros estudiantes brillaron con luz propia en la Feria de Ciencias 2025. Desde volcanes en erupción hasta robots programados para resolver laberintos, los proyectos presentados demostraron un alto nivel de investigación y trabajo en equipo.</p>
          <p>El jurado, compuesto por docentes y profesionales invitados, tuvo la difícil tarea de evaluar las propuestas. Los proyectos ganadores destacaron por su originalidad, su rigurosidad metodológica y su potencial para resolver problemas de nuestro entorno. Felicitamos a todos los participantes por su dedicación y por recordarnos que la curiosidad es el motor del conocimiento.</p>
        `,
        date: '15 de Abril, 2025',
        category: 'Eventos',
        imageUrl: 'https://picsum.photos/seed/ciencias/800/400',
      },
      // Add other articles with full content as needed...
      {
        id: '3',
        title: 'Campaña de Reciclaje Escolar: Cuidando Nuestro Planeta',
        summary: 'Únete a nuestra iniciativa para promover la sostenibilidad y el cuidado del medio ambiente en nuestra comunidad escolar.',
        content: '<p>Contenido completo sobre la campaña de reciclaje...</p>',
        date: '20 de Mayo, 2025',
        category: 'Comunidad',
        imageUrl: 'https://picsum.photos/seed/reciclaje/800/400',
      },
      {
        id: '4',
        title: 'Celebración del Día del Maestro: Homenaje a Nuestros Educadores',
        summary: 'Un día especial para reconocer la invaluable labor de nuestros dedicados maestros. ¡Gracias por su compromiso!',
        content: '<p>Contenido completo sobre la celebración del día del maestro...</p>',
        date: '06 de Julio, 2025',
        category: 'Eventos',
        imageUrl: 'https://picsum.photos/seed/maestros/800/400',
      },
      {
        id: '5',
        title: 'Concurso de Oratoria Interescolar: Voces que Inspiran',
        summary: 'Nuestros talentosos oradores compitieron y destacaron en el concurso interescolar, llevando en alto el nombre del colegio.',
        content: '<p>Contenido completo sobre el concurso de oratoria...</p>',
        date: '10 de Agosto, 2025',
        category: 'Académico',
        imageUrl: 'https://picsum.photos/seed/oratoria/800/400',
      },
      {
        id: '6',
        title: 'Campeonato Deportivo: Espíritu de Equipo y Competencia',
        summary: 'Nuestros equipos deportivos demostraron gran habilidad y espíritu deportivo en el campeonato anual. ¡Felicitaciones a todos los participantes!',
        content: '<p>Contenido completo sobre el campeonato deportivo...</p>',
        date: '25 de Septiembre, 2025',
        category: 'Deportes',
        imageUrl: 'https://picsum.photos/seed/deportes/800/400',
      }
];

export const NoticiaDetalle = () => {
  const { noticiaId } = useParams<{ noticiaId: string }>();
  const article = mockNews.find(n => n.id === noticiaId);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-primary">Noticia no encontrada</h1>
        <p className="text-neutral-600 mt-4">La noticia que buscas no existe o ha sido eliminada.</p>
        <Link to="/noticias" className="mt-8 inline-flex items-center gap-2 text-accent font-semibold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Volver a Noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/noticias" className="inline-flex items-center gap-2 text-accent font-semibold hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Volver a Noticias
          </Link>
          
          <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
            {article.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-primary my-4">{article.title}</h1>

          <div className="flex items-center gap-3 text-sm text-neutral-500 mb-6">
            <CalendarDays className="w-4 h-4" />
            <span>{article.date}</span>
          </div>

          <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[450px] object-cover rounded-2xl shadow-lg mb-8" />

          <div 
            className="prose lg:prose-xl max-w-none text-neutral-800"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
};
