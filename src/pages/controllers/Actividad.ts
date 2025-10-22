import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Actividad",
  setup() {
    return {
      listadoActividades: [
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
      form: reactive({
        curso: null,
        nombre: "",
        descripcion: "",
        tipo: "",
        fechaEntrega: "",
        estado: {
          id: 3,
          nombre: "PENDIENTE"
        }
      }),
      rules: reactive<FormRules>({
        curso: [
          {
            required: true,
            message: "El curso es requerido",
            trigger: "blur",
          },
        ],
        nombre: [
          {
            required: true,
            message: "El nombre de la actividad es requerido",
            trigger: "blur",
          },
        ],
        descripcion: [
          {
            required: true,
            message: "La descripcion es requerida",
            trigger: "blur",
          },
        ],
        tipo: [
          {
            required: true,
            message: "El tipo de actividad es requerido",
            trigger: "blur",
          },
        ],
        fechaEntrega: [
          {
            required: true,
            message: "La fecha de entrega es requerida",
            trigger: "change",
          },
        ],
      }),
    };
  },
  methods: {
    async registrarActividad() {
      if (!this.formRef) return;
      console.log(this.form);
      await this.formRef.validate((valid) => {
        if (valid) {
        }
      });
    },
    cargarActividades() {

    },
    editar(indice: number, fila: any) { },
    eliminar(indice: number, fila: any) { },
  },
  components: {
    UploadFilled,
  },
});