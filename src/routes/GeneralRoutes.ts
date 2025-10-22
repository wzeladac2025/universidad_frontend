import Acceso from "@/pages/Acceso.vue";
import Carrera from "@/pages/Carrera.vue";
import Curso from "@/pages/Curso.vue";
import Docente from "@/pages/Docente.vue";
import Home from "@/pages/Home.vue";
import Materia from "@/pages/Materia.vue";
import Password from "@/pages/Password.vue";
import Perfil from "@/pages/Perfil.vue";
import Usuario from "@/pages/Usuario.vue";
import Estudiante from "@/pages/Estudiante.vue";
import Inscripcion from "@/pages/Inscripcion.vue";
import Tarea from "@/pages/Tarea.vue";
import Nota from "@/pages/Nota.vue";
import IngresarNota from "@/pages/IngresarNota.vue";
import Actividad from "@/pages/Actividad.vue";

export const generalRoutes = [
  { path: "home", component: Home },
  { path: "acceso", component: Acceso },
  { path: "usuario", component: Usuario },
  { path: "carrera", component: Carrera },
  { path: "materia", component: Materia },
  { path: "curso", component: Curso },
  { path: "perfil", component: Perfil },
  { path: "password", component: Password },
  { path: "estudiante", component: Estudiante },
  { path: "docente", component: Docente },
  { path: "inscripcion", component: Inscripcion },
  { path: "tarea", component: Tarea },
  { path: "nota", component: Nota },
  { path: "ingresarNota", component: IngresarNota },
  { path: "actividad", component: Actividad },
];
