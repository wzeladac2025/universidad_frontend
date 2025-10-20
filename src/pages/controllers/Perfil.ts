import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Perfil",
  setup() {
    return {
      form: ref({
        nombres: "Walter Waldemar",
        apellidos: "Zelada Castro",
        rol: "Administrador",
        estado: "Activo",
        correo: "correo@correo.com",
        avatar: "",
      }),
    };
  },
  methods: {
    editProfile() {},
    deleteAccount() {},
  },
  components: {},
});
