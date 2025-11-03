import { ElLoading, ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { Loading, UploadFilled } from "@element-plus/icons-vue";
import { CursoService } from "@/services/Curso.service";
import { MateriaService } from "@/services/Materia.service";
import { InscripcionService } from "@/services/Inscripcion.service";
import { ActividadService } from "@/services/Actividad.service"
import { EstudianteService } from "@/services/Estudiante.service";
import { ActividadEstudianteService } from "@/services/Actividad_Estudiante.service"

interface Actividad {
  id: number;
  nombre: string;
  descripcion?: string;
  fecha_entrega?: string | null;
  tipo?: string;
  punteo?: number;
  id_curso?: number;
}

export default defineComponent({
  name: "IngresarNota",
  setup() {

const form = reactive({
  id_curso: 0,
  curso: null,
  actividad: null,
});
  const listadoEstudiantes = ref([]);
  const estudianteService = new EstudianteService();

  const listadoActividades = ref<Actividad[]>([]);
  const actividadSeleccionada = ref<any>(null);
  const actividadService = new ActividadService();

  const listadoInscripcion = ref([]);
  const inscripcionService= new InscripcionService();

  const listadoCursos: any = ref([]);
  const cursoService = new CursoService();

  const listadoMaterias: any = ref([]);
  const materiaService = new MateriaService();

  const listadoActividadesEstudiantes = ref([]);
  const actividadEstudianteService = new ActividadEstudianteService();

  const carnetDocente = ref("");

  const id_curso = ref<number | null>(null);

  const cargarActividades = async () => {
  if (!id_curso.value || id_curso.value === 0) {
    ElMessage.warning("Seleccione un curso válido");
    return;
  }

  try {
    const respuesta: any = await actividadService.obtenerPorCurso(id_curso.value);
    let actividades = respuesta?.data ?? respuesta;

    if (actividades && !Array.isArray(actividades)) {
      actividades = [actividades];
    }

    listadoActividades.value = actividades ?? [];

    if (!listadoActividades.value.length) {
      ElMessage.warning("No hay actividades registradas para este curso");
    } else {
      ElMessage.success("Actividades cargadas correctamente");
    }
  } catch (error) {
    console.error("Error al cargar actividades:", error);
    ElMessage.error("Error al obtener las actividades del curso");
  }
};

    const cargarListadoEstudiantesActividad = () => {
  const idActividad = Number(form.actividad);
  console.log("🔹 Actividad seleccionada ID:", idActividad);

  if (!idActividad) {
    ElMessage.warning("Debe seleccionar una actividad válida");
    return;
  }

  const actividadObj = listadoActividades.value.find(
    (a: any) => Number(a.id) === idActividad
  );

  if (!actividadObj) {
    ElMessage.warning("No se encontró la actividad seleccionada");
    return;
  }

  // ✅ Guardar la actividad encontrada
  actividadSeleccionada.value = actividadObj;
  console.log("✅ Actividad encontrada:", actividadSeleccionada.value);

  // Aquí puedes cargar estudiantes si quieres
  // cargarEstudiantesPorCurso(actividadObj.id_curso);
};

  const cargarCursosPorCarnet = async () => {
        if (!carnetDocente.value) {
          ElMessage.warning("Por favor, ingrese su carnet antes de cargar los cursos");
          return;
        }
  
        try {
          const respuesta: any = await cursoService.obtenerPorCarnet(carnetDocente.value);
          listadoCursos.value = respuesta;
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
  
      // Carga inicial de materias y actividades
      const cargar = async () => {
        materiaService.obtener().then((respuesta: any) => {
          listadoMaterias.value = respuesta;
        });
  
        inscripcionService.obtener().then((respuesta: any) => {
          listadoInscripcion.value = respuesta;
        });

        estudianteService.obtener().then((respuesta: any) => {
          listadoEstudiantes.value = respuesta;
        });
        
      };
  
      onBeforeMount(async () => {
        cargar();
      });
  

    const formNode = reactive({
      id: 0,
      nota: 0
    });
//avdsc
    return {
      form,
      id_curso,
      cargarListadoEstudiantesActividad,
      cargarActividades,
      listadoActividades,
      listadoActividadesEstudiantes,
      actividadEstudianteService,
      actividadService,
      actividadSeleccionada,
      cargarCursosPorCarnet,
      carnetDocente,
      listadoCursos,
      estudianteService,
      listadoEstudiantes,
      index: -1,
      formRef: ref<FormInstance>(),
      formRefEstudiante: ref<FormInstance>(),
      formEstudiante: reactive({
        nodo: formNode
      }),   
      rules: reactive<FormRules>({
          id_curso: [
            { required: true, message: "El curso es requerido", trigger: "blur" },
          ],
          actividad: [
            { required: true, message: "Debe seleccionar una actividad del curso", trigger: "blur" },
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

      async actualizarNotaEstudiante(estudiante: any) {
        if (!this.actividadSeleccionada) {
          ElMessage.warning("Debe seleccionar una actividad antes de actualizar notas");
          return;
        }

        const idActividad = this.actividadSeleccionada.id;
        const carnetEstudiante = estudiante.carnet;
        const nota = estudiante.nota;

        if (nota === null || nota === undefined || isNaN(nota)) {
          ElMessage.warning("Debe ingresar una nota válida");
          return;
        }

        const loading = ElLoading.service({ text: "Actualizando nota. Espere..." });

        try {
          const data = {
            id_tarea: idActividad,
            carnet_estudiante: carnetEstudiante,
            nota: nota,
          };

          const respuesta: any = await this.actividadEstudianteService.obtenerPorTareaEstudiante(
            data.id_tarea,
            data.carnet_estudiante
          );

          const id_tarea_estudiante = respuesta.data.id;
          await this.actividadEstudianteService.actualizar(id_tarea_estudiante, data);

          loading.close();
          ElMessage({
            message: `Nota actualizada correctamente para ${estudiante.nombre}`,
            type: "success",
            plain: true,
          });
        } catch (error: any) {
          loading.close();
          console.error("Error al actualizar nota:", error);
          ElMessage({
            message: error?.mensaje || "Error al actualizar nota",
            type: "error",
            plain: true,
          });
        }
      },
    editar(indice: number, fila: any) { },
    eliminar(indice: number, fila: any) { },
  },
  components: {
    UploadFilled,
  },
});