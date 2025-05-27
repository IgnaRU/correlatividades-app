// src/App.js
import React, { useState, useEffect } from 'react';
import './index.css'; // Importa tu archivo CSS principal

const careerCourses = [
  { id: 'am1', name: 'Análisis Matemático I', year: 1, prerequisites: [], status: 'pending' },
  { id: 'quim1', name: 'Química General', year: 1, prerequisites: [], status: 'pending' },
  { id: 'sist_rep', name: 'Sistemas de Representación', year: 1, prerequisites: [], status: 'pending' },
  { id: 'inf1', name: 'Informática I', year: 1, prerequisites: [], status: 'pending' },
  { id: 'pens_sis', name: 'Pensamiento Sistémico', year: 1, prerequisites: [], status: 'pending' },
  { id: 'fis1', name: 'Física I', year: 1, prerequisites: [], status: 'pending' },
  { id: 'alg', name: 'Álgebra General y Geometría Analítica', year: 1, prerequisites: [], status: 'pending' },
  { id: 'ing_soc', name: 'Ingeniería y Sociedad', year: 1, prerequisites: [], status: 'pending' },

  { id: 'am2', name: 'Análisis Matemático II', year: 2, prerequisites: [{ id: 'am1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'admin_gral', name: 'Administración General', year: 2, prerequisites: [{ id: 'inf1', requirement: 'Cursada' }, { id: 'pens_sis', requirement: 'Cursada' }, { id: 'alg', requirement: 'Cursada' }, { id: 'ing_soc', requirement: 'Cursada' }], status: 'pending' },
  { id: 'prob_est', name: 'Probabilidad y Estadística', year: 2, prerequisites: [{ id: 'am1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'cien_mat', name: 'Ciencia de los Materiales', year: 2, prerequisites: [{ id: 'quim1', requirement: 'Cursada' }, { id: 'fis1', requirement: 'Cursada' }], status: 'pending' },
  { id: 'fis2', name: 'Física II', year: 2, prerequisites: [{ id: 'am1', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'eco_gen', name: 'Economía General', year: 2, prerequisites: [{ id: 'pens_sis', requirement: 'Cursada' }, { id: 'ing_soc', requirement: 'Cursada' }, { id: 'am1', requirement: 'Cursada' }], status: 'pending' },
  { id: 'inf2', name: 'Informática II', year: 2, prerequisites: [{ id: 'inf1', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'ing1', name: 'Inglés I', year: 2, prerequisites: [], status: 'pending' },

  { id: 'costos', name: 'Costos y Presupuestos', year: 3, prerequisites: [{ id: 'admin_gral', requirement: 'Cursada' }, { id: 'eco_gen', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'inf1', requirement: 'Aprobada' }, { id: 'pens_sis', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }, { id: 'ing_soc', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'est_trab', name: 'Estudio del Trabajo', year: 3, prerequisites: [{ id: 'admin_gral', requirement: 'Cursada' }, { id: 'prob_est', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'sist_rep', requirement: 'Aprobada' }, { id: 'inf1', requirement: 'Aprobada' }, { id: 'pens_sis', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }, { id: 'ing_soc', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'comerc', name: 'Comercialización', year: 3, prerequisites: [{ id: 'admin_gral', requirement: 'Cursada' }, { id: 'prob_est', requirement: 'Cursada' }, { id: 'eco_gen', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'inf1', requirement: 'Aprobada' }, { id: 'pens_sis', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }, { id: 'ing_soc', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'termo', name: 'Termodinámica y Máquinas Térmicas', year: 3, prerequisites: [{ id: 'quim1', requirement: 'Cursada' }, { id: 'fis2', requirement: 'Cursada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'quim1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'est_res', name: 'Estática y Resistencia de Materiales', year: 3, prerequisites: [{ id: 'am2', requirement: 'Cursada' }, { id: 'cien_mat', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'quim1', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'mec_flu', name: 'Mecánica de los Fluidos', year: 3, prerequisites: [{ id: 'am2', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'eco_emp', name: 'Economía de la Empresa', year: 3, prerequisites: [{ id: 'admin_gral', requirement: 'Cursada' }, { id: 'eco_gen', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'inf1', requirement: 'Aprobada' }, { id: 'pens_sis', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }, { id: 'ing_soc', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'electrotec', name: 'Electrotecnia y Máquinas Eléctricas', year: 3, prerequisites: [{ id: 'fis2', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'an_num', name: 'Análisis Numérico y Cálculo Avanzado', year: 3, prerequisites: [{ id: 'am2', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },

  { id: 'seg_hig', name: 'Seguridad, Higiene e Ingeniería Ambiental', year: 4, prerequisites: [{ id: 'est_trab', requirement: 'Cursada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'prob_est', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'inv_op', name: 'Investigación Operativa', year: 4, prerequisites: [{ id: 'am2', requirement: 'Cursada' }, { id: 'prob_est', requirement: 'Cursada' }, { id: 'an_num', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'proc_ind', name: 'Procesos Industriales', year: 4, prerequisites: [{ id: 'est_trab', requirement: 'Cursada' }, { id: 'termo', requirement: 'Cursada' }, { id: 'electrotec', requirement: 'Cursada' }, { id: 'fis2', requirement: 'Aprobada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'cien_mat', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'quim1', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'mec_mec', name: 'Mecánica y Mecanismos', year: 4, prerequisites: [{ id: 'am2', requirement: 'Cursada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'eval_proy', name: 'Evaluación de Proyectos', year: 4, prerequisites: [{ id: 'costos', requirement: 'Cursada' }, { id: 'est_trab', requirement: 'Cursada' }, { id: 'comerc', requirement: 'Cursada' }, { id: 'eco_emp', requirement: 'Cursada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'prob_est', requirement: 'Aprobada' }, { id: 'eco_gen', requirement: 'Aprobada' }, { id: 'am1', requirement: 'Aprobada' }, { id: 'inf1', requirement: 'Aprobada' }, { id: 'pens_sis', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }, { id: 'ing_soc', requirement: 'Aprobada' }, { id: 'ing1', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'plan_cont_prod', name: 'Planificación y Control de la Producción', year: 4, prerequisites: [{ id: 'est_trab', requirement: 'Cursada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'prob_est', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'dis_prod', name: 'Diseño del Producto', year: 4, prerequisites: [{ id: 'inf2', requirement: 'Cursada' }, { id: 'comerc', requirement: 'Cursada' }, { id: 'sist_rep', requirement: 'Aprobada' }, { id: 'inf1', requirement: 'Aprobada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'prob_est', requirement: 'Aprobada' }, { id: 'eco_gen', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'ing2', name: 'Inglés II', year: 4, prerequisites: [{ id: 'ing1', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'inst_ind', name: 'Instalaciones Industriales', year: 4, prerequisites: [{ id: 'termo', requirement: 'Cursada' }, { id: 'est_res', requirement: 'Cursada' }, { id: 'mec_flu', requirement: 'Cursada' }, { id: 'electrotec', requirement: 'Cursada' }, { id: 'fis2', requirement: 'Aprobada' }, { id: 'am2', requirement: 'Aprobada' }, { id: 'cien_mat', requirement: 'Aprobada' }, { id: 'fis1', requirement: 'Aprobada' }, { id: 'quim1', requirement: 'Aprobada' }, { id: 'alg', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'legis', name: 'Legislación', year: 4, prerequisites: [{ id: 'admin_gral', requirement: 'Aprobada' }], status: 'pending' },

  { id: 'mant', name: 'Mantenimiento', year: 5, prerequisites: [{ id: 'inst_ind', requirement: 'Cursada' }, { id: 'termo', requirement: 'Aprobada' }, { id: 'est_res', requirement: 'Aprobada' }, { id: 'electrotec', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'man_mat', name: 'Manejo de Materiales y Distribución de Plantas', year: 5, prerequisites: [{ id: 'est_trab', requirement: 'Cursada' }, { id: 'mec_mec', requirement: 'Cursada' }, { id: 'am2', requirement: 'Aprobada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'est_res', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'com_ext', name: 'Comercio Exterior', year: 5, prerequisites: [{ id: 'eval_proy', requirement: 'Cursada' }, { id: 'est_trab', requirement: 'Aprobada' }, { id: 'comerc', requirement: 'Aprobada' }, { id: 'eco_emp', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'relac_ind', name: 'Relaciones Industriales', year: 5, prerequisites: [{ id: 'est_trab', requirement: 'Cursada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'prob_est', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'ing_cal', name: 'Ingeniería en Calidad', year: 5, prerequisites: [{ id: 'est_trab', requirement: 'Cursada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'prob_est', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'cont_gest', name: 'Control de Gestión', year: 5, prerequisites: [{ id: 'costos', requirement: 'Cursada' }, { id: 'eco_emp', requirement: 'Cursada' }, { id: 'admin_gral', requirement: 'Aprobada' }, { id: 'eco_gen', requirement: 'Aprobada' }], status: 'pending' },
  { id: 'proy_fin', name: 'Proyecto Final', year: 5, prerequisites: [{ id: 'seg_hig', requirement: 'Cursada' }, { id: 'inv_op', requirement: 'Cursada' }, { id: 'proc_ind', requirement: 'Cursada' }, { id: 'eval_proy', requirement: 'Cursada' }, { id: 'plan_cont_prod', requirement: 'Cursada' }, { id: 'dis_prod', requirement: 'Cursada' }, { id: 'ing2', requirement: 'Cursada' }, { id: 'inst_ind', requirement: 'Cursada' }, { id: 'mant', requirement: 'Cursada' }, { id: 'man_mat', requirement: 'Cursada' }, { id: 'com_ext', requirement: 'Cursada' }, { id: 'relac_ind', requirement: 'Cursada' }, { id: 'ing_cal', requirement: 'Cursada' }, { id: 'cont_gest', requirement: 'Cursada' }, { id: 'am2', requirement: 'Cursada' }, { id: 'est_trab', requirement: 'Cursada' }, { id: 'termo', requirement: 'Cursada' }, { id: 'electrotec', requirement: 'Cursada' }, { id: 'an_num', requirement: 'Cursada' }, { id: 'est_res', requirement: 'Cursada' }, { id: 'mec_flu', requirement: 'Cursada' }, { id: 'mec_mec', requirement: 'Cursada'}], status: 'pending' },

function App() {
  const [courses, setCourses] = useState(careerCourses);
  const [enabledCourses, setEnabledCourses] = useState({});

  const isCourseEnabled = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return false;

    if (course.prerequisites.length === 0) {
      return true;
    }

    const allPrerequisitesMet = course.prerequisites.every(prerequisite => {
      const prereqCourse = courses.find(c => c.id === prerequisite.id);
      if (!prereqCourse) return false;

      if (prerequisite.requirement === 'Cursada') {
        return prereqCourse.status === 'cursando' || prereqCourse.status === 'regular' || prereqCourse.status === 'aprobada';
      } else if (prerequisite.requirement === 'Aprobada') {
        return prereqCourse.status === 'regular' || prereqCourse.status === 'aprobada';
      }
      return false;
    });

    return allPrerequisitesMet;
  };

  useEffect(() => {
    // Cargar el estado desde localStorage al iniciar
    const storedCourses = localStorage.getItem('courseStates');
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    }

    const newEnabledCourses = {};
    courses.forEach(course => {
      newEnabledCourses[course.id] = isCourseEnabled(course.id);
    });
    setEnabledCourses(newEnabledCourses);
  }, []); // El array de dependencia vacío asegura que esto solo se ejecute una vez al montar el componente

  useEffect(() => {
    // Recalcular enabledCourses cuando cambian los courses
    const newEnabledCourses = {};
    courses.forEach(course => {
      newEnabledCourses[course.id] = isCourseEnabled(course.id);
    });
    setEnabledCourses(newEnabledCourses);
  }, [courses]);

  const handleStatusChange = (courseId, newStatus) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );

    // Guardar el estado actualizado en localStorage
    localStorage.setItem('courseStates', JSON.stringify(courses));
  };

  const coursesByYear = Object.entries(
    courses.reduce((acc, course) => {
      if (!acc[course.year]) {
        acc[course.year] = [];
      }
      acc[course.year].push(course);
      return acc;
    }, {})
  )
  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
  .map(([year, courses]) => ({
    year: parseInt(year),
    courses
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 rounded-lg p-2 bg-white shadow-md">Régimen de Correlatividades de Carrera</h1>
        <p className="text-lg text-gray-600">Selecciona el estado de cada materia para ver cómo se habilitan las correlativas.</p>
      </header>
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {coursesByYear.map(yearData => (
          <section key={yearData.year} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Año {yearData.year}</h2>
            <div className="space-y-4">
              {yearData.courses.map(course => (
                <div
                  key={course.id}
                  className={`p-4 rounded-lg shadow-sm transition-all duration-300
                    ${enabledCourses[course.id] ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200 opacity-70 cursor-not-allowed'}
                    ${course.status === 'aprobada' ? 'bg-green-100 border-green-300' : ''}
                    ${course.status === 'regular' ? 'bg-yellow-100 border-yellow-300' : ''}
                    ${course.status === 'desaprobada' ? 'bg-red-100 border-red-300' : ''}
                  `}
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{course.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                    {course.prerequisites.length > 0 && (<span className="font-semibold">Correlativas: </span>)}
                    {course.prerequisites.length > 0 ? (
                      course.prerequisites.map(prerequisite => {
                        const prereqCourse = courses.find(c => c.id === prerequisite.id);
                        return (
                          <span key={prerequisite.id} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                            {prereqCourse ? `${prereqCourse.name} (${prerequisite.requirement})` : prerequisite.id}
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
                      disabled={!enabledCourses[course.id] && course.status === 'pendiente'}
                    >
                      <option value="pendiente" disabled={course.status !== 'pendiente'}>Pendiente</option>
                      <option value="cursando">Cursando</option>
                      <option value="regular">Aprobada (Regular)</option>
                      <option value="aprobada">Aprobada (Directa)</option>
                      <option value="desaprobada">Desaprobado</option>
                    </select>
                  </div>
                  {!enabledCourses[course.id] && course.status === 'pendiente' && (
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