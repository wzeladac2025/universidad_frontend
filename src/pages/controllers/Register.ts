import { Loading } from "@/components/Loading";
import { ArrowLeft, Check } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Register",
  setup() {
    return {
      checkIcon: Check,
      backIcon: ArrowLeft,
      formRef: ref<FormInstance>(),
      form: reactive({
        perfilUsuario: "",
        correoUsuario: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
      }),
      rules: reactive<FormRules>({
        perfilUsuario: [
          {
            required: true,
            message: "Debe seleccionar un perfil de usuario",
            trigger: "blur",
          },
        ],
        correoUsuario: [
          {
            required: true,
            message: "El correo de usuario es requerido.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "El correo debe ser válido.",
            trigger: ["blur", "change"],
          },
        ],
        primerNombre: [
          {
            required: true,
            message: "El primer nombre es requerido",
            trigger: "blur",
          },
        ],
        segundoNombre: [
          {
            required: true,
            message: "El segundo nombre es requerido",
            trigger: "blur",
          },
        ],
        primerApellido: [
          {
            required: true,
            message: "El primer apellido es requerido",
            trigger: "blur",
          },
        ],
        segundoApellido: [
          {
            required: true,
            message: "El segundo apellido es requerido",
            trigger: "blur",
          },
        ],
      }),
      perfiles: [
        {
          label: "Estudiante",
          value: "Estudiante",
        },
        {
          label: "Docente",
          value: "Docente",
        },
      ],
    };
  },
  methods: {
    async registerUser() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          let loading = Loading.loading("Registrando Usuario");
          setTimeout(() => {
            loading.close();
            this.$router.push("/");
          }, 2000);
        }
      });
    },
    regresar() {
      this.$router.push("/");
    },
  },
});
