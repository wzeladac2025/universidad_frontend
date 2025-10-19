import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Curso",
  setup() {
    return {
      listadoCarreras: [{
        facultad: "Ingenieria",
        nombre: "Ingenieria en Sistemas",
        duracion: 5,
      }],
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        facultad: "",
        nombre: "",
        duracion: 0
      }),
      rules: reactive<FormRules>({
        facultad: [
          {
            required: true,
            message: "Seleccione una facultad",
            trigger: "blur",
          },
        ],
        nombre: [
          {
            required: true,
            message: "El nombre es requerido",
            trigger: "blur",
          },
        ],
        duracion: [
          {
            required: true,
            message: "La duracion es requerida",
            trigger: "blur",
          },
        ],
      })
    };
  },
  methods: {
    async registrarCarrera() {
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