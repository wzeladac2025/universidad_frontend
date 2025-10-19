import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Curso",
  setup() {
    return {
      listadoCursos: [{
        materia: "Desarrollo Web",
        docente: "Walter Zelada",
        periodo: 2025,
        seccion: "A",
        cupo: 25  
      }], 
      index: -1,     
      formRef: ref<FormInstance>(),
      form: reactive({
        materia: "",
        docente: "",
        periodo: "",
        seccion: "",
        cupo: 0,
      }),
      rules: reactive<FormRules>({
        materia: [
          {
            required: true,
            message: "Seleccione una materia",
            trigger: "blur",
          },
        ],
        docente: [
          {
            required: true,
            message: "Seleccione un docente",
            trigger: "blur",
          },
        ],
        periodo: [
          {
            required: true,
            message: "El periodo es requerido",
            trigger: "blur",
          },
        ],
        seccion: [
          {
            required: true,
            message: "La seccion es requerida",
            trigger: "blur",
          },
        ],
        cupo: [
          {
            required: true,
            message: "El cupo es requerido",
            trigger: "blur",
          },
        ],                
      })
    };
  },
  methods: {
    async registrarCurso() {
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