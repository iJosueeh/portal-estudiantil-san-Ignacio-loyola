import { Routes, Route } from "react-router-dom";
import { Login } from "../modules/auth/pages/Login";
import { PublicLayout } from "../shared/components/layout/PublicLayout";
import { PrivateLayout } from "../shared/components/layout/PrivateLayout";
import { HomePage } from "../modules/home/HomePage";
import { DashboardHome } from "../modules/student/pages/DashboardHome";
import { Cursos } from "../modules/student/pages/Cursos";
import { Tareas } from "../modules/student/pages/Tareas";
import { Calificaciones } from "../modules/student/pages/Calificaciones";
import { Calendario } from "../modules/student/pages/Calendario";
import { Perfil } from "../modules/student/pages/Perfil";
import { CourseDetails } from "../modules/student/pages/CourseDetails"; // Import CourseDetails
import { CourseMaterials } from "../modules/student/pages/CourseMaterials"; // Import CourseMaterials

// Public Pages
import { Noticias } from "../modules/public/pages/Noticias";
import { Admision } from "../modules/public/pages/Admision"; // Corrected import
import { Calendario as PublicCalendario } from "../modules/public/pages/Calendario"; // Renamed to avoid conflict
import { Contacto } from "../modules/public/pages/Contacto";
import { NoticiaDetalle } from "../modules/public/pages/NoticiaDetalle";

// Parent Pages
import { DashboardPadreHome } from "../modules/parent/DashboardPadreHome";
import { CalificacionesHijo } from "../modules/parent/CalificacionesHijo";
import { TareasHijo } from "../modules/parent/TareasHijo";
import { CalendarioHijo } from "../modules/parent/CalendarioHijo";
import { ComunicacionPadre } from "../modules/parent/ComunicacionPadre";

// Teacher Pages
import { DashboardDocenteHome } from "../modules/teacher/pages/DashboardDocenteHome";
import { MisCursos } from "../modules/teacher/pages/MisCursos";
import { RevisarTareas } from "../modules/teacher/pages/RevisarTareas";
import { GestionarCalificaciones } from "../modules/teacher/pages/GestionarCalificaciones";
import { CalendarioDocente } from "../modules/teacher/pages/CalendarioDocente";
import { ComunicacionDocente } from "../modules/teacher/pages/ComunicacionDocente";
import { ReviewTaskDetails } from "../modules/teacher/pages/ReviewTaskDetails"; // Import ReviewTaskDetails

// Admin Pages
import { DashboardAdminHome } from "../modules/admin/pages/DashboardAdminHome";
import { GestionarUsuarios } from "../modules/admin/pages/GestionarUsuarios";
import { GestionarCursos } from "../modules/admin/pages/GestionarCursos";
import { GestionarEventos } from "../modules/admin/pages/GestionarEventos";
import { Reportes } from "../modules/admin/pages/Reportes";
import { ComunicacionAdmin } from "../modules/admin/pages/ComunicacionAdmin";
import { Configuracion } from "../modules/admin/pages/Configuracion";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="noticias" element={<Noticias />} />
                <Route path="noticias/:noticiaId" element={<NoticiaDetalle />} />
                <Route path="admision" element={<Admision />} />
                <Route path="calendario" element={<PublicCalendario />} />
                <Route path="contacto" element={<Contacto />} />
            </Route>

            {/* Ruta de Autenticación */}
            <Route path="/login" element={<Login />} />

            {/* Rutas Privadas (Dashboard Estudiante) */}
            <Route path="/dashboard" element={<PrivateLayout role="student" />}>
                <Route index element={<DashboardHome />} />
                <Route path="cursos" element={<Cursos />} />
                <Route path="cursos/:courseId" element={<CourseDetails />} />
                <Route path="cursos/:courseId/materiales" element={<CourseMaterials />} /> {/* New route for CourseMaterials */}
                <Route path="tareas" element={<Tareas />} />
                <Route path="calificaciones" element={<Calificaciones />} />
                <Route path="calendario" element={<Calendario />} />
                <Route path="perfil" element={<Perfil />} />
            </Route>

            {/* Rutas Privadas (Dashboard Padre) */}
            <Route path="/dashboard-padre" element={<PrivateLayout role="parent" />}>
                <Route index element={<DashboardPadreHome />} />
                <Route path="calificaciones" element={<CalificacionesHijo />} />
                <Route path="tareas" element={<TareasHijo />} />
                <Route path="calendario" element={<CalendarioHijo />} />
                <Route path="comunicacion" element={<ComunicacionPadre />} />
            </Route>

            {/* Rutas Privadas (Dashboard Docente) */}
            <Route path="/dashboard-docente" element={<PrivateLayout role="teacher" />}>
                <Route index element={<DashboardDocenteHome />} />
                <Route path="cursos" element={<MisCursos />} />
                <Route path="revisar-tareas" element={<RevisarTareas />} />
                <Route path="revisar-tareas/:taskId" element={<ReviewTaskDetails />} /> {/* New route for ReviewTaskDetails */}
                <Route path="calificaciones" element={<GestionarCalificaciones />} />
                <Route path="calendario" element={<CalendarioDocente />} />
                <Route path="comunicacion" element={<ComunicacionDocente />} />
            </Route>

            {/* Rutas Privadas (Dashboard Administrador) */}
            <Route path="/dashboard-admin" element={<PrivateLayout role="admin" />}>
                <Route index element={<DashboardAdminHome />} />
                <Route path="usuarios" element={<GestionarUsuarios />} />
                <Route path="cursos" element={<GestionarCursos />} />
                <Route path="eventos" element={<GestionarEventos />} />
                <Route path="reportes" element={<Reportes />} />
                <Route path="comunicacion" element={<ComunicacionAdmin />} />
                <Route path="configuracion" element={<Configuracion />} />
            </Route>
        </Routes>
    )
}