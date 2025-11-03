import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { UploadFilled } from '@element-plus/icons-vue'
import { ActividadService } from "@/services/Actividad.service";
import { InscripcionService } from "@/services/Inscripcion.service";

export default defineComponent({
  name: "Tarea",
  setup() {
  const listadoActividades: any = ref([]);
  const actividadService = new ActividadService();

  const listadoInscipciones: any = ref([]);
  const inscripcionService = new InscripcionService();

  const carnetEstudiante = ref(""); // <-- variable usada por el método

      const cargar = async () => {
      actividadService.obtener().then((respuesta: any) => {
      listadoActividades.value = respuesta;
      });

      inscripcionService.obtener().then((respuesta: any) => {
      listadoInscipciones.value = respuesta;
      });
    };

    onBeforeMount(async () => {
      cargar();
    });
    
    const cargarCursosPorCarnet = async () => {
          if (!carnetEstudiante.value) {
            ElMessage.warning("Por favor, ingrese su carnet antes de cargar los cursos");
            return;
          }
    
          try {
            const respuesta: any = await inscripcionService.obtenerPorCurso(carnetEstudiante.value);
            listadoActividades.value = respuesta;
            if (respuesta.length === 0) {
              ElMessage.warning("No se encontraron cursos para este docente");
            } else {  
              ElMessage.success("Cursos cargados correctamente");
            }
          } catch (error: any) {
            console.error("Error al cargar cursos:", error);
            ElMessage.error("Error al cargar los cursos del docente");
          }
        };
        
        const handleFileSuccess = (response: any, file: any) => {
          ElMessage.success(`Archivo ${file.name} subido correctamente`);
        };

        const handleFileError = (err: any, file: any) => {
          ElMessage.error(`Error al subir ${file.name}`);
        };

        const beforeFileUpload = (file: File) => {
          const isAllowed =
            ["image/jpeg", "image/png", "application/pdf", "application/zip"].includes(file.type);
          const isLt20M = file.size / 1024 / 1024 < 20;

          if (!isAllowed) {
            ElMessage.error("Solo se permiten archivos JPG, PNG, PDF o ZIP");
          }
          if (!isLt20M) {
            ElMessage.error("El archivo no debe superar los 20MB");
          }
          return isAllowed && isLt20M;
        };
    return {
      listadoActividades,
      cargarCursosPorCarnet,
      listadoInscipciones,
      formRef: ref<FormInstance>(),
      form: reactive({
        carnetEstudiante: "",
        curso: null,
        nombre: "",

      }),
      rules: reactive<FormRules>({
        listadoActividades,
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

    },
    cargarCursosPorCarnet() {

    }
  },
  components: {
    UploadFilled
  },
});
