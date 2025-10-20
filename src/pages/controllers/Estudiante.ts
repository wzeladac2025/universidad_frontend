import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Estudiante",
  setup() {
    return {
      listadoEstudiantes: [
        {
          carne: "2025-10000",
          nombres: "Walter Waldemar",
          apellidos: "Zelada Castro",
          estado: {
            label: "Inscrito",
            value: true,
          },
        },
      ],
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        carne: "",
        nombres: "",
        apellidos: "",
        estado: true,
      }),
      rules: reactive<FormRules>({
        nombres: [
          {
            required: true,
            message: "Los nombres del estudiante son requeridos.",
            trigger: "blur",
          },
        ],
        apellidos: [
          {
            required: true,
            message: "Los apellidos del estudiante son requeridos.",
            trigger: "blur",
          },
        ],
        estado: [
          {
            required: true,
            message: "El estado es requerido.",
            trigger: "blur",
          },
        ],
      }),
      estados: [
        {
          label: "Inscrito",
          value: true,
        },
        {
          label: "No Inscrito",
          value: false,
        },
      ],
    };
  },
  methods: {
    async registrarEstudiante() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
        }
      });
    },
    editar(indice: number, fila: any) {},
    eliminar(indice: number, fila: any) {},
  },
  components: {},
});
