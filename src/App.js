import React, { useState, useEffect } from 'react';

// Datos de ejemplo para las materias de una carrera universitaria.
// Puedes modificar esto con los datos reales de tu carrera.
const careerCourses = [
  // Primer Año
  { id: 'math1', name: 'Matemática I', year: 1, prerequisites: [], status: 'pending' },
  { id: 'physics1', name: 'Física I', year: 1, prerequisites: [], status: 'pending' },
  { id: 'prog1', name: 'Programación I', year: 1, prerequisites: [], status: 'pending' },
  { id: 'alg', name: 'Álgebra', year: 1, prerequisites: [], status: 'pending' },
  { id: 'chem', name: 'Química General', year: 1, prerequisites: [], status: 'pending' },

  // Segundo Año
  { id: 'math2', name: 'Matemática II', year: 2, prerequisites: ['math1', 'alg'], status: 'pending' },
  { id: 'physics2', name: 'Física II', year: 2, prerequisites: ['physics1', 'math1'], status: 'pending' },
  { id: 'prog2', name: 'Programación II', year: 2, prerequisites: ['prog1'], status: 'pending' },
  { id: 'stats', name: 'Estadística', year: 2, prerequisites: ['math1'], status: 'pending' },
  { id: 'data_struc', name: 'Estructuras de Datos', year: 2, prerequisites: ['prog1'], status: 'pending' },

  // Tercer Año
  { id: 'db', name: 'Bases de Datos', year: 3, prerequisites: ['prog2', 'data_struc'], status: 'pending' },
  { id: 'networks', name: 'Redes de Computadoras', year: 3, prerequisites: ['prog2'], status: 'pending' },
  { id: 'os', name: 'Sistemas Operativos', year: 3, prerequisites: ['prog2', 'data_struc'], status: 'pending' },
  { id: 'algo', name: 'Algoritmos Avanzados', year: 3, prerequisites: ['prog2', 'stats'], status: 'pending' },
  { id: 'soft_eng', name: 'Ingeniería de Software', year: 3, prerequisites: ['prog2'], status: 'pending' },

  // Cuarto Año
  { id: 'ai', name: 'Inteligencia Artificial', year: 4, prerequisites: ['algo', 'db'], status: 'pending' },
  { id: 'web_dev', name: 'Desarrollo Web', year: 4, prerequisites: ['db', 'networks'], status: 'pending' },
  { id: 'security', name: 'Seguridad Informática', year: 4, prerequisites: ['os', 'networks'], status: 'pending' },
  { id: 'ml', name: 'Machine Learning', year: 4, prerequisites: ['ai', 'stats'], status: 'pending' },
  { id: 'ethics', name: 'Ética Profesional', year: 4, prerequisites: [], status: 'pending' }, // No tiene correlativas

  // Quinto Año
  { id: 'thesis_prep', name: 'Preparación de Tesis', year: 5, prerequisites: ['soft_eng', 'web_dev'], status: 'pending' },
  { id: 'project_mgmt', name: 'Gestión de Proyectos', year: 5, prerequisites: ['soft_eng'], status: 'pending' },
  { id: 'distributed_sys', name: 'Sistemas Distribuidos', year: 5, prerequisites: ['networks', 'os'], status: 'pending' },
  { id: 'cloud_comp', name: 'Computación en la Nube', year: 5, prerequisites: ['distributed_sys', 'security'], status: 'pending' },
  { id: 'internship', name: 'Pasantía Profesional', year: 5, prerequisites: ['thesis_prep'], status: 'pending' },
];

function App() {
  // Estado para almacenar todas las materias y sus estados actuales
  const [courses, setCourses] = useState(careerCourses);
  // Estado para almacenar qué materias están habilitadas para ser cursadas
  const [enabledCourses, setEnabledCourses] = useState({});

  // Función para verificar si una materia está habilitada
  const isCourseEnabled = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;

    // Si no tiene prerrequisitos, siempre está habilitada (asumiendo que es de primer año o similar)
    if (course.prerequisites.length === 0) {
      return true;
    }

    // Verifica si todos los prerrequisitos están aprobados (Aprobación Directa o Regular)
    const allPrerequisitesMet = course.prerequisites.every(prereqId => {
      const prereqCourse = courses.find(c => c.id === prereqId);
      return prereqCourse && (prereqCourse.status === 'approved' || prereqCourse.status === 'regular');
    });

    return allPrerequisitesMet;
  };

  // Efecto que se ejecuta cada vez que cambia el estado de las materias
  useEffect(() => {
    const newEnabledCourses = {};
    courses.forEach(course => {
      newEnabledCourses[course.id] = isCourseEnabled(course.id);
    });
    setEnabledCourses(newEnabledCourses);
  }, [courses]); // Depende del estado 'courses'

  // Manejador de cambio para el estado de una materia
  const handleStatusChange = (courseId, newStatus) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
  };

  // Agrupa las materias por año para facilitar la visualización
  const coursesByYear = courses.reduce((acc, course) => {
    if (!acc[course.year]) {
      acc[course.year] = [];
    }
    acc[course.year].push(course);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <style>
        {`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 rounded-lg p-2 bg-white shadow-md">
          Régimen de Correlatividades de Carrera
        </h1>
        <p className="text-lg text-gray-600">
          Selecciona el estado de cada materia para ver cómo se habilitan las correlativas.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Object.keys(coursesByYear).sort().map(year => (
          <section key={year} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
              Año {year}
            </h2>
            <div className="space-y-4">
              {coursesByYear[year].map(course => (
                <div
                  key={course.id}
                  className={`p-4 rounded-lg shadow-sm transition-all duration-300
                    ${enabledCourses[course.id] ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed'}
                    ${course.status === 'approved' ? 'bg-green-100 border-green-300' : ''}
                    ${course.status === 'regular' ? 'bg-yellow-100 border-yellow-300' : ''}
                    ${course.status === 'failed' ? 'bg-red-100 border-red-300' : ''}
                  `}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{course.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    {course.prerequisites.length > 0 && (
                      <span className="font-semibold">Correlativas: </span>
                    )}
                    {course.prerequisites.length > 0 ? (
                      course.prerequisites.map(prereqId => {
                        const prereqCourse = courses.find(c => c.id === prereqId);
                        return (
                          <span key={prereqId} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                            {prereqCourse ? prereqCourse.name : prereqId}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-gray-500">Ninguna</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 mt-3">
                    <label htmlFor={`status-${course.id}`} className="sr-only">Estado de {course.name}</label>
                    <select
                      id={`status-${course.id}`}
                      className={`block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500
                        ${enabledCourses[course.id] ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'}
                      `}
                      value={course.status}
                      onChange={(e) => handleStatusChange(course.id, e.target.value)}
                      disabled={!enabledCourses[course.id] && course.status === 'pending'} // Solo se puede cambiar si está habilitada o ya tiene un estado
                    >
                      <option value="pending" disabled={course.status !== 'pending'}>Pendiente</option>
                      <option value="regular">Regular</option>
                      <option value="approved">Aprobación Directa</option>
                      <option value="failed">Desaprobado</option>
                    </select>
                  </div>
                  {!enabledCourses[course.id] && course.status === 'pending' && (
                    <p className="text-red-600 text-sm mt-2">
                      Habilita las correlativas para cursar esta materia.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="text-center mt-12 p-4 text-gray-500 text-sm">
        <p>&copy; 2025 Aplicación de Correlatividades. Desarrollado con React y Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;