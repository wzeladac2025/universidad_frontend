import { Loading } from "@/components/Loading";
import { DArrowRight, Menu, User } from "@element-plus/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GeneralLayout",
  setup() {
    return {};
  },
  methods: {
    logout() {
      let loading = Loading.loading("Cerrando Sesión");
      setTimeout(() => {
        loading.close();
        this.$router.push("/");
      }, 3000);
    },
    menuAcceso() {
      this.$router.push("/general/acceso");
    },
    menuUsuario() {
      this.$router.push("/general/usuario");
    },
    menuCarrera() {
      this.$router.push("/general/carrera");
    },
    menuMateria() {
      this.$router.push("/general/materia");
    },
    menuCurso() {
      this.$router.push("/general/curso");
    },
    password() {
      this.$router.push("/general/password");
    },
    perfil() {
      this.$router.push("/general/perfil");
    },
    menuEstudiante() {
      this.$router.push("/general/estudiante");
    },
    menuDocente() {
      this.$router.push("/general/docente");
    },
    menuInscripcion() {
      this.$router.push("/general/inscripcion");
    },
    menuAsignarCurso() {
      this.$router.push("/general/asignarCurso");
    },
    menuTarea() {
      this.$router.push("/general/tarea");
    },
    menuNota() {
      this.$router.push("/general/nota");
    },
    menuIngresarNota() {
      this.$router.push("/general/ingresarNota");
    },
    menuActividad() {
      this.$router.push("/general/actividad");
    },
  },
  components: {
    Menu,
    User,
    DArrowRight,
  },
});
