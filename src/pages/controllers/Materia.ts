import type { FormInstance } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Materia",
  setup() {
    return {
      listadoMaterias: [{
        carrera: "Ingenieria en Sistemas",
        nombre: "Desarrollo Web",
        credito: 5,
        semestre: 2025,
        obligacion: true,        
      }],
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        carrera: "",
        nombre: "",
        credito: 0,
        semestre: 0,
        obligacion: "",
      }),
      rules: {},
    };
  },
  methods: {
    registrarMateria() {},
    editar(indice: number, fila: any) {},
    eliminar(indice: number, fila: any) {},
  },
  components: {},
});