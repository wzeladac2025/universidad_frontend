import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Acceso",
  setup() {
    return {
      listadoAccesos: [{
        rol: {
          label: "Estudiante",
          value: "estudiante",
        },
        acceso: "/general/home",
      }],
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        rol: "",
        acceso: ""
      }),
      rules: reactive<FormRules>({
        rol: [
          {
            required: true,
            message: "Seleccione un rol",
            trigger: "blur",
          },
        ],
        acceso: [
          {
            required: true,
            message: "La ruta de acceso es requerida",
            trigger: "blur",
          }
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
    async registrarAcceso() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {

        }
      });
    },
    editar(indice: number, fila: any) { },
    eliminar(indice: number, fila: any) { },
  },
  components: {},
});