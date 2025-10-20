import Carrera from "@/pages/Carrera.vue";
import Curso from "@/pages/Curso.vue";
import Home from "@/pages/Home.vue";
import Materia from "@/pages/Materia.vue";
import Perfil from "@/pages/Perfil.vue";
import Usuario from "@/pages/Usuario.vue";

export const generalRoutes = [
  { path: "home", component: Home },
  { path: "usuario", component: Usuario },   
  { path: "carrera", component: Carrera },  
  { path: "materia", component: Materia }, 
  { path: "curso", component: Curso },
  { path: "perfil", component: Perfil },
];
