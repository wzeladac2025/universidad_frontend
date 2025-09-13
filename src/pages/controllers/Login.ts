import { Loading } from "@/components/Loading";
import { Lock, User } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, markRaw, reactive, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {
      user: markRaw(User),
      lock: markRaw(Lock),
      formRef: ref<FormInstance>(),
      form: reactive({
        nombreUsuario: "",
        tipoUsuario: "",
        password: "",
      }),
      rules: reactive<FormRules>({
        nombreUsuario: [
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
            message: "Debe seleccionar un perfil de usuario.",
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
  },
});
