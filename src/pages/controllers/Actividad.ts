import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { Loading } from "@/components/Loading";
import { CursoService } from "@/services/Curso.service";
import { MateriaService } from "@/services/Materia.service";
import { ActividadService } from "@/services/Actividad.service";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "Actividad",
  setup() {
    const listadoActividades = ref([]);
    const actividadService = new ActividadService();

    const listadoMaterias: any = ref([]);
    const materiaService = new MateriaService();

    const listadoCursos: any = ref([]);
    const cursoService = new CursoService();

    const carnetDocente = ref(""); // <-- variable usada por el método

    // Método para cargar cursos según carnet
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

      actividadService.obtener().then((respuesta: any) => {
        listadoActividades.value = respuesta;
      });
    };

    onBeforeMount(async () => {
      cargar();
    });

    return {
      carnetDocente,
      listadoActividades,
      listadoCursos,
      listadoMaterias,
      cargar,
      cargarCursosPorCarnet, // <-- importante
        tiposActividad: [
        {
          label: "tarea",
          value: "tarea",
        },
        {
          label: "asistencia",
          value: "asistencia",
        },
        {
          label: "primer parcial",
          value: "primer parcial",
        },
        {
          label: "segundo parcial",
          value: "segundo parcial",
        },
        {
          label: "proyecto",
          value: "proyecto",
        },
        {
          label: "examen final",
          value: "examen final",
        },
      ],
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        id: 0,
        curso: null,
        nombre: "",
        punteo: 0,
        nombre_materia: "",
        descripcion: "",
        tipo: "",
        fecha_entrega: "",
        estado: {
          id: 3,
          nombre: "PENDIENTE",
        },
      }),
      rules: reactive<FormRules>({
        curso: [{ required: true, message: "El curso es requerido", trigger: "blur" }],
        nombre: [{ required: true, message: "El nombre de la actividad es requerido", trigger: "blur" }],
        descripcion: [{ required: true, message: "La descripcion es requerida", trigger: "blur" }],
        tipo: [{ required: true, message: "El tipo de actividad es requerido", trigger: "blur" }],
        fechaEntrega: [{ required: true, message: "La fecha de entrega es requerida", trigger: "change" }],
      }),
      actividadService
    };
  },
  methods: {
    async registrarActividad() {
      if (!this.formRef) return;
            await this.formRef.validate((valid) => {
              if (valid) {
                if (this.index == -1) {
                  let loading = Loading.loading("Registrando curso. Espere...");
                  let data = JSON.stringify(this.form);
                  this.actividadService
                    .registrar(data)
                    .then(() => {
                      loading.close();
                      ElMessage({
                        message: "Curso registrado correctamente.",
                        type: "success",
                        plain: true,
                      });
                      setTimeout(() => {
                        this.formRef?.resetFields();
                        this.cargar();
                      }, 2000);
                    })
                    .catch((error) => {
                      loading.close();
                      ElMessage({
                        message: error.mensaje || "Error al registrar curso",
                        type: "error",
                        plain: true,
                      });
                    });
                } else {
                  let loading = Loading.loading("Actualizando curso. Espere...");
                  let data = JSON.stringify(this.form);
                  this.actividadService
                    .actualizar(this.form.id, data)
                    .then(() => {
                      loading.close();
                      ElMessage({
                        message: "Curso actualizado correctamente.",
                        type: "success",
                        plain: true,
                      });
                      setTimeout(() => {
                        this.index = -1;
                        this.formRef?.resetFields();
                        this.cargar();
                      }, 2000);
                    })
                    .catch((error) => {
                      loading.close();
                      ElMessage({
                        message: error.mensaje || "Error al actualizar curso",
                        type: "error",
                        plain: true,
                      });
                    });
                }
              }
            });
    },
    nombreMateria(key: string) {
      return this.listadoMaterias.find((f: any) => f.id == key)?.nombre;
    },
          editar(indice: number, fila: any) {
      this.index = indice;
      Object.assign(this.form, fila);
    },

    eliminar(indice: number, fila: any) {
      console.warn("Eliminar curso aún no implementado", fila);
    },
  },
  components: {
    UploadFilled,
  },
});
