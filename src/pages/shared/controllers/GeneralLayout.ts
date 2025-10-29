import { Loading } from "@/components/Loading";
import { BackendApiService } from "@/services/BackendApi.service";
import { BdService } from "@/services/bd.service";
import { DArrowRight, Menu, User } from "@element-plus/icons-vue";
import { defineComponent, onBeforeMount, ref } from "vue";

export default defineComponent({
  name: "GeneralLayout",
  setup() {
    const bdService = new BdService();
    let nombre = ref("");
    let role = ref("");

    onBeforeMount(async () => {
      bdService.read(bdService.db, "usuario").then((doc: any) => {
        nombre.value = doc.usuario.nombres + " " + doc.usuario.apellidos;
        role.value = doc.usuario.role;
        BackendApiService.access_token = doc.access_token;
      });
    });

    return {
      bdService,
      nombre,
      role,
    };
  },
  methods: {
    logout() {
      let loading = Loading.loading("Cerrando Sesión");
      this.bdService.delete(this.bdService.db, "usuario").then(() => {
        loading.close();
        this.$router.push("/");
      });
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
