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
        nombres: "",
        apellidos: "",
        contrasena: ""
      }),
      rules: reactive<FormRules>({
        perfilUsuario: [
          {
            required: true,
            message: "Seleccione un perfil de usuario",
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
        nombres: [
          {
            required: true,
            message: "Los nombres del usuario son requeridos.",
            trigger: "blur",
          },
        ],
        apellidos: [
          {
            required: true,
            message: "Los apellidos del usuario son requeridos.",
            trigger: "blur",
          },
        ],
        contrasena: [
          {
            required: true,
            message: "La contrasena del usuario es requerida.",
            trigger: "blur",
          },
        ],        
      }),
      perfiles: [
        {
          label: "Estudiante",
          value: "estudiante",
        },
        {
          label: "Docente",
          value: "docente",
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
