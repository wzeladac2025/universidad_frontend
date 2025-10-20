import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Perfil",
  setup() {
    return {
      form: reactive({
        contrasenaActual: "",
        nuevaContrasena: "",
        confirmarContrasena: "",
      }),
      formRef: ref<FormInstance>(),
      rules: reactive<FormRules>({
        contrasenaActual: [
          {
            required: true,
            message: "Debe ingresar su contrasena actual",
            trigger: "blur",
          },
        ],
        nuevaContrasena: [
          {
            required: true,
            message: "La nueva contrasena es requerida",
            trigger: "blur",
          },
        ],
        confirmarContrasena: [
          {
            required: true,
            message: "Debe confirmar la nueva contrasena",
            trigger: "blur",
          },
        ],
      }),
    };
  },
  methods: {
    async cambiarContrasena() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
        }
      });
    },
    limpiar() {},
  },
  components: {},
});
