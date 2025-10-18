import { Loading } from "@/components/Loading";
import { Lock, User, Check, Plus } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {
      userIcon: User,
      lockIcon: Lock,
      loginIcon: Check,
      registerIcon: Plus,
      formRef: ref<FormInstance>(),
      form: reactive({
        correoUsuario: "",
        tipoUsuario: "",
        password: "",
      }),
      rules: reactive<FormRules>({
        correoUsuario: [
          {
            required: true,
            message: "El correo de usuario es requerido.",
            trigger: "blur",
          },
          {
            type: 'email',
            message: 'El correo debe ser válido.',
            trigger: ['blur', 'change'],
          },
        ],
        tipoUsuario: [
          {
            required: true,
            message: "Seleccione un perfil de usuario.",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "El password es requerido.",
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
        {
          label: "Administrador",
          value: "administrador",
        },
      ],
    };
  },
  methods: {
    async login() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          let loading = Loading.loading("Iniciando Sesión");
          setTimeout(() => {
            loading.close();
            this.$router.push("/general/home");
          }, 2000);
        }
      });
    },

    register() {
      this.$router.push("/register");
    },
    obtenerPerfilLabel(value: string): string | undefined {
      const perfil = this.perfiles.find(perfil => perfil.value == value);
      return perfil?.label;
    }
  },
});
