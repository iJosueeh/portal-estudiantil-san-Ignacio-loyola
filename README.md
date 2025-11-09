# Portal Estudiantil San Ignacio de Loyola

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)
![H2 Database](https://img.shields.io/badge/H2_Database-4479A1?style=for-the-badge&logo=h2&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)

Este proyecto es un **Portal Estudiantil integral** diseñado para el Colegio Parroquial San Ignacio de Loyola. Ofrece una plataforma moderna y responsiva para estudiantes, padres, docentes y administradores, facilitando la gestión académica, la comunicación y el acceso a recursos educativos. El sistema se compone de un frontend dinámico y un robusto backend, construidos con tecnologías de vanguardia para garantizar escalabilidad y mantenibilidad.

## ✨ Características Principales

### Frontend (Interfaz de Usuario)

*   **Dashboards Personalizados:** Vistas específicas para Estudiantes, Padres, Docentes y Administradores.
*   **Gestión de Cursos:** Visualización de cursos, materiales, tareas y calificaciones.
*   **Comunicación:** Módulos para mensajes y anuncios.
*   **Calendario Interactivo:** Eventos académicos y escolares.
*   **Gestión de Tareas:** Entrega y revisión de tareas.
*   **Reportes Dinámicos:** Gráficos y tablas para administradores.
*   **Autenticación Segura:** Sistema de login y logout funcional.

### Backend (API y Persistencia)

*   **API RESTful:** Puntos finales bien definidos para la interacción con el frontend.
*   **Gestión de Usuarios:** Roles diferenciados (Estudiante, Padre, Docente, Administrador).
*   **Modelado de Datos Robusto:** Entidades JPA para representar la estructura académica completa.
*   **Persistencia de Datos:** Almacenamiento y recuperación eficiente de información.

## 🚀 Stack de Tecnologías

### Frontend (React/TypeScript/TailwindCSS)

*   **[React](https://react.dev/):** Biblioteca de JavaScript para construir interfaces de usuario interactivas y eficientes. Elegido por su rendimiento, ecosistema y facilidad para crear componentes reutilizables.
*   **[Vite](https://vitejs.dev/):** Herramienta de construcción de frontend de próxima generación que ofrece un arranque de servidor de desarrollo instantáneo y una compilación rápida para producción.
*   **[TypeScript](https://www.typescriptlang.org/):** Superset de JavaScript que añade tipado estático, mejorando la calidad del código, la detección de errores en tiempo de desarrollo y la mantenibilidad de proyectos grandes.
*   **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS utility-first que permite construir diseños personalizados rápidamente sin salir del HTML. Proporciona un control granular sobre el estilo y fomenta un diseño consistente.
*   **[React Router](https://reactrouter.com/):** Biblioteca estándar para el enrutamiento declarativo en aplicaciones React, permitiendo la navegación entre diferentes vistas de la aplicación.
*   **[Lucide React](https://lucide.dev/):** Colección de iconos personalizables y ligeros, integrados para mejorar la interfaz de usuario con elementos visuales claros.
*   **[Recharts](https://recharts.org/):** Biblioteca de gráficos compuesta por componentes React, utilizada para la visualización de datos interactiva en los módulos de reportes.

### Backend (Spring Boot/Java)

*   **[Spring Boot](https://spring.io/projects/spring-boot):** Framework líder para construir aplicaciones Java robustas y escalables. Simplifica el desarrollo de microservicios y aplicaciones web con su enfoque "opinionado" y auto-configuración.
*   **[Java 21](https://www.oracle.com/java/technologies/javase/21-spec-ea-downloads.html):** Lenguaje de programación potente y maduro, elegido por su rendimiento, seguridad y amplio ecosistema.
*   **[Spring Data JPA](https://spring.io/projects/spring-data-jpa):** Parte del ecosistema Spring que simplifica la implementación de capas de acceso a datos utilizando JPA (Java Persistence API) y Hibernate. Permite definir repositorios con métodos de consulta automáticos.
*   **[H2 Database](https://www.h2database.com/html/main.html):** Base de datos relacional en memoria, ideal para entornos de desarrollo y pruebas por su rapidez y facilidad de configuración.
*   **[Lombok](https://projectlombok.org/):** Herramienta que reduce el código repetitivo (boilerplate) en Java, generando automáticamente getters, setters, constructores, etc., a través de anotaciones.
*   **Spring Security (starter):** Proporciona autenticación y autorización robustas para aplicaciones Spring, esencial para proteger los recursos del portal.
*   **Spring Boot Starter Web:** Facilita la construcción de aplicaciones web y RESTful con Spring MVC.
*   **Spring Boot Starter Validation:** Permite la validación de datos de entrada utilizando la API de Bean Validation.

## 🛠️ Primeros Pasos

Sigue estas instrucciones para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas:

*   **[Node.js](https://nodejs.org/):** Versión LTS recomendada.
*   **[Java Development Kit (JDK) 21](https://www.oracle.com/java/technologies/javase/21-spec-ea-downloads.html):** Para el desarrollo del backend.
*   **[Apache Maven](https://maven.apache.org/):** Herramienta de gestión de proyectos para Java.
*   **[Git](https://git-scm.com/):** Para clonar el repositorio.

### 1. Clonar el Repositorio

```sh
git clone https://github.com/tu-usuario/portal-estudiantil-san-ignacio-loyola.git
cd portal-estudiantil-san-ignacio-loyola
```

### 2. Configuración y Ejecución del Frontend

1.  Navega al directorio del frontend:
    ```sh
    cd frontend/portal-estudiantil-san-ignacio-loyola
    ```
2.  Instala las dependencias del proyecto:
    ```sh
    npm install
    ```
3.  Inicia la aplicación en modo de desarrollo:
    ```sh
    npm run dev
    ```
    La aplicación estará disponible en tu navegador, generalmente en `http://localhost:5173`.

### 3. Configuración y Ejecución del Backend

1.  Navega al directorio del backend:
    ```sh
    cd backend
    ```
2.  Compila y ejecuta la aplicación Spring Boot:
    ```sh
    mvn spring-boot:run
    ```
    El backend se iniciará, generalmente en `http://localhost:8080`.
    *   **Consola H2:** Accede a la base de datos en memoria a través de `http://localhost:8080/h2-console`.
        *   **Credenciales:** `Username: sa`, `Password: password`.

## ⚙️ Scripts Disponibles (Frontend)

En el directorio `frontend/portal-estudiantil-san-ignacio-loyola`, puedes ejecutar los siguientes comandos:

*   `npm run dev`: Inicia el servidor de desarrollo de Vite.
*   `npm run build`: Compila la aplicación para producción, generando los archivos optimizados en la carpeta `dist`.
*   `npm run lint`: Ejecuta ESLint para analizar el código en busca de errores y problemas de estilo.
*   `npm run preview`: Sirve la versión de producción compilada localmente para una previsualización.

## 📊 Estado Actual y Próximos Pasos

### Frontend: Funcionalidades Implementadas Recientemente

*   **Gestión de Sesiones:** Implementación completa de la funcionalidad de "Cerrar Sesión" en todas las barras laterales (Administrador, Padre, Estudiante, Docente), con redirección segura a la página de login. Los botones de cierre de sesión ahora incluyen `cursor-pointer` para una mejor experiencia de usuario.
*   **Detalle de Materiales de Curso:** La sección "Materiales" dentro de "Mis Cursos" para estudiantes ha sido refactorizada. Ahora, al hacer clic, se navega a una página dedicada (`CourseMaterials.tsx`) que ofrece una vista detallada y organizada de los recursos. Los materiales se categorizan (Sílabo, Documentos, Videos, Grabaciones, Otros) y se pueden filtrar por semana, mejorando significativamente la accesibilidad y organización.
*   **Consistencia de Marca:** Se ha estandarizado el título principal en todas las barras laterales a "Portal PSIL", reforzando la identidad visual del proyecto.

### Backend: Estructura y Persistencia

Se ha establecido una base sólida para el backend, definiendo la estructura de datos y la capa de persistencia:

*   **Entidades JPA:** Se han modelado las siguientes entidades, representando los objetos de negocio clave del portal:
    *   `User`: Información básica del usuario y su rol.
    *   `Student`: Detalles específicos del estudiante, vinculado a un `User`.
    *   `Teacher`: Detalles específicos del docente, vinculado a un `User`.
    *   `Parent`: Detalles específicos del padre/apoderado, vinculado a un `User`.
    *   `Course`: Información sobre los cursos ofrecidos, incluyendo el docente que lo imparte.
    *   `Enrollment`: Registra la inscripción de un `Student` en un `Course`.
    *   `Task`: Define las tareas asignadas a los estudiantes dentro de un `Course`.
    *   `TaskSubmission`: Almacena las entregas de tareas realizadas por los `Student`s.
    *   `Material`: Recursos educativos asociados a un `Course` (archivos, enlaces, videos).
    *   `Grade`: Registra las calificaciones obtenidas por los `Student`s en `Course`s específicos.
    *   `Event`: Eventos académicos o escolares, con opción de ser específicos de un `Course`.
    *   `Announcement`: Anuncios generales o específicos de un `Course`, publicados por un `User`.
    *   `Message`: Sistema de mensajería interna entre `User`s.
*   **Data Transfer Objects (DTOs):** Se han creado DTOs correspondientes para cada entidad, diseñados para optimizar la transferencia de datos entre el frontend y el backend, asegurando que solo la información necesaria sea expuesta y facilitando la validación.
*   **Repositorios (Spring Data JPA):** Se han implementado interfaces de repositorio para cada entidad, aprovechando las capacidades de Spring Data JPA para simplificar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y consultas personalizadas a la base de datos.
*   **Configuración de Base de Datos:** Se ha configurado una base de datos H2 en memoria para el entorno de desarrollo, permitiendo una rápida iteración y pruebas. La configuración JPA asegura la generación automática del esquema de la base de datos a partir de las entidades.
*   **Pruebas de Persistencia:** Se ha ejecutado con éxito un test unitario (`UserRepositoryTest`) que valida la correcta configuración de la base de datos y la persistencia básica de la entidad `User`, confirmando que la capa de datos está operativa.
*   **Gestión de Repositorio:** Se han actualizado los archivos `.gitignore` y `.gitattributes` para optimizar la gestión del repositorio, excluyendo archivos generados y de IDE, y mejorando la precisión de las estadísticas de lenguaje del proyecto.

### ➡️ Próximos Pasos Clave

1.  **Implementación de la Capa de Servicios:** Continuar con la creación de servicios para las entidades restantes, encapsulando la lógica de negocio compleja y coordinando las operaciones de los repositorios.
2.  **Implementación de Controladores REST:** Desarrollar los controladores RESTful para cada recurso, exponiendo los puntos finales de la API que el frontend consumirá para interactuar con el backend.
3.  **Integración de Seguridad:** Implementar la autenticación y autorización completa utilizando Spring Security, protegiendo las rutas y recursos de la API según los roles de usuario.
4.  **Integración de Base de Datos Real:** Configurar y migrar a una base de datos persistente (ej. PostgreSQL) para entornos de producción, asegurando la durabilidad y escalabilidad de los datos.
5.  **Desarrollo de Funcionalidades CRUD Completas:** Implementar las operaciones CRUD completas en el backend para todas las entidades, permitiendo la gestión total de los datos del portal.