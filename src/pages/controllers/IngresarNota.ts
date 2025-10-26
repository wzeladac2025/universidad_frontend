import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "IngresarNota",
  setup() {
    const formNode = reactive({
      id: 0,
      nota: 0
    });

    return {
      listadoEstudiantes: [
        {
          nombre: "Tarea #3",
          descripcion: "Tarea Numero 3",
          fechaCalificacion: new Date(),
          fechaEntrega: new Date(),
          tipo: {
            id: 1,
            nombre: "TAREA"
          },
          estado: {
            id: 2,
            nombre: "NO COMPLETADA",
          },
          nota: 0,
          notaNeta: 0,
        },
      ],
      tiposActividad: [
        {
          id: 1,
          nombre: "TAREA"
        },
        {
          id: 2,
          nombre: "ASISTENCIA"
        },
        {
          id: 3,
          nombre: "PRIMER PARCIAL"
        },
        {
          id: 4,
          nombre: "SEGUNDO PARCIAL"
        },
        {
          id: 5,
          nombre: "PROYECTO"
        },
        {
          id: 6,
          nombre: "EXAMEN FINAL"
        },
      ],
      index: -1,
      formRef: ref<FormInstance>(),
      formRefEstudiante: ref<FormInstance>(),
      form: reactive({
        curso: null,
        actividad: null,
      }),
      formEstudiante: reactive({
        nodo: formNode
      }),   
      rules: reactive<FormRules>({
        curso: [
          {
            required: true,
            message: "El curso es requerido",
            trigger: "blur",
          },
        ],
        actividad: [
          {
            required: true,
            message: "Debe seleccionar una actividad del curso",
            trigger: "blur",
          },
        ],
      }),
      rulesEstudiante: reactive<FormRules>({
        id: [
          {
            required: true,
            message: "El curso es requerido",
            trigger: "blur",
          },
        ],
        nota: [
          {
            required: true,
            message: "Debe seleccionar una actividad del curso",
            trigger: "blur",
          },
        ],
      }),      
    };
  },
  methods: {
    cargarActividades() {

    },
    cargarListadoEstudiantesActividad () {

    },
    editar(indice: number, fila: any) { },
    eliminar(indice: number, fila: any) { },
  },
  components: {
    UploadFilled,
  },
});