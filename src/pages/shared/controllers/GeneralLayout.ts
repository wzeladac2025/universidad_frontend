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
    perfil() {
      this.$router.push("/general/perfil");
    },
  },
  components: {
    Menu,
    User,
    DArrowRight,
  },
});
