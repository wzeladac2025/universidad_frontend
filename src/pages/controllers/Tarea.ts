import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { UploadFilled } from '@element-plus/icons-vue'

export default defineComponent({
  name: "Tarea",
  setup() {
    return {
      listadoActividades: [
        {
          nombre: "Tarea #3",
          descripcion: "Tarea Numero 3",
          fecha: new Date(),
          fechaEntrega: null,
          estado: {
            id: 2,
            nombre: "PENDIENTE"
          },
        },        
        {
          nombre: "Tarea #2",
          descripcion: "Tarea Numero 2",
          fecha: new Date(),
          fechaEntrega: null,
          estado: {
            id: 2,
            nombre: "PENDIENTE"
          },
        },
        {
          nombre: "Tarea #1",
          descripcion: "Tarea Numero 1",
          fecha: new Date(),
          fechaEntrega: new Date(),
          estado: {
            id: 1,
            nombre: "COMPLETADA"
          }
        },        
      ],
      formRef: ref<FormInstance>(),
      form: reactive({
        curso: null,
      }),
      rules: reactive<FormRules>({
        curso: [
          {
            required: true,
            message: "El curso es requerido",
            trigger: "blur",
          },
        ]
      }),
    };
  },
  methods: {
    cargarActividades() {

    }
  },
  components: {
    UploadFilled
  },
});
