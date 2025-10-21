import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Nota",
  setup() {
    return {
      listadoCursos: [
        {
          nombre: "Desarrollo Web",
          estado: {
            id: 1,
            nombre: "APROBADO",
          },
          nota: 100,
        },
        {
          nombre: "Etica Profesional",
          estado: {
            id: 2,
            nombre: "NO APROBADO",
          },
          nota: 59,
        },
      ],
      listadoActividades: [
        {
          nombre: "Tarea #3",
          descripcion: "Tarea Numero 3",
          fechaCalificacion: new Date(),
          fechaEntrega: null,
          estado: {
            id: 2,
            nombre: "NO COMPLETADA",
          },
          nota: 0,
          notaNeta: 0,
        },
        {
          nombre: "Tarea #2",
          descripcion: "Tarea Numero 2",
          fechaCalificacion: new Date(),
          fechaEntrega: null,
          estado: {
            id: 2,
            nombre: "NO COMPLETADA",
          },
          nota: 0,
          notaNeta: 0,
        },
        {
          nombre: "Tarea #1",
          descripcion: "Tarea Numero 1",
          fechaCalificacion: new Date(),
          fechaEntrega: new Date(),
          estado: {
            id: 1,
            nombre: "COMPLETADA",
          },
          nota: 100,
          notaNeta: 5,
        },
      ],
      formRef: ref<FormInstance>(),
      form: reactive({
        carrera: null,
        semestre: null,
        curso: null,
      }),
      rules: reactive<FormRules>({
        carrera: [
          {
            required: true,
            message: "La carrera es requerida",
            trigger: "blur",
          },
        ],
        semestre: [
          {
            required: true,
            message: "El semestre es requerido",
            trigger: "blur",
          },
        ],
        curso: [
          {
            required: true,
            message: "El curso es requerido",
            trigger: "blur",
          },
        ],
      }),
    };
  },
  methods: {
    cargarActividades() {},
  },
  components: {
    UploadFilled,
  },
});
