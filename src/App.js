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
 
  ];
const STORAGE_KEY = 'careerCoursesStatus';  // define la clave para localStorage
const initialCourses = careerCourses;       // los datos originales
function App() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'cursada', 'aprobada'

  // Carga inicial desde localStorage o datos por defecto
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCourses(JSON.parse(stored));
    } else {
      setCourses(initialCourses);
    }
  }, []);

  // Guarda en localStorage cada vez que cambian las materias
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  // Cambiar estado de una materia
  const handleStatusChange = (courseId, newStatus) => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, status: newStatus } : course
      )
    );
  };

  // Filtrar las materias según el filtro seleccionado
  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  return (
    <div>
      <h1>Carreras UTN - Ingeniería Industrial</h1>

      <div>
        <label>Filtrar materias: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="cursada">Cursadas</option>
          <option value="aprobada">Aprobadas</option>
        </select>
      </div>

      <ul>
        {filteredCourses.map(course => (
          <li key={course.id}>
            <strong>{course.name}</strong> (Año {course.year}) - Estado: {course.status}
            <select
              value={course.status}
              onChange={(e) => handleStatusChange(course.id, e.target.value)}
            >
              <option value="pending">Pendiente</option>
              <option value="cursada">Cursada</option>
              <option value="aprobada">Aprobada</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;