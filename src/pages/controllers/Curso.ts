import { Loading } from "@/components/Loading";
import { CursoService } from "@/services/Curso.service";
import { DocenteService } from "@/services/Docente.service";
import { MateriaService } from "@/services/Materia.service";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";

export default defineComponent({
  name: "Curso",
  setup() {
    // Datos reactivos
    const listadoCursos = ref([]);
    const listadoDocentes: any = ref([]);
    const listadoMaterias: any = ref([]);

    // Servicios
    const cursoService = new CursoService();
    const docenteService = new DocenteService();
    const materiaService = new MateriaService();

    // Función para cargar los datos iniciales
    const cargar = () => {
      cursoService.obtener().then((respuesta: any) => {
        listadoCursos.value = respuesta;
      });

      docenteService.obtener().then((respuesta: any) => {
        listadoDocentes.value = respuesta;
      });

      materiaService.obtener().then((respuesta: any) => {
        listadoMaterias.value = respuesta;
      });
    };

    // Cargar los datos antes de montar el componente
    onBeforeMount(async () => {
      cargar();
    });

    return {
      listadoCursos,
      listadoDocentes,
      listadoMaterias,
      cargar,
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        id: 0,
        id_materia: null,
        nombre_materia: "",
        id_docente: null,
        carnet_docente: "",
        periodo: "",
        seccion: "",
        cupo_maximo: 0,
      }),
      rules: reactive<FormRules>({
        id_materia: [
          { required: true, message: "Seleccione una materia", trigger: "blur" },
        ],
        id_docente: [
          { required: true, message: "Seleccione un docente", trigger: "blur" },
        ],
        periodo: [
          { required: true, message: "El periodo es requerido", trigger: "blur" },
        ],
        seccion: [
          { required: true, message: "La sección es requerida", trigger: "blur" },
        ],
        cupo: [
          { required: true, message: "El cupo es requerido", trigger: "blur" },
        ],
      }),
      cursoService,
    };
  },
  methods: {
    async registrarCurso() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          if (this.index == -1) {
            let loading = Loading.loading("Registrando curso. Espere...");
            let data = JSON.stringify(this.form);
            this.cursoService
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
            this.cursoService
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

    editar(indice: number, fila: any) {
      this.index = indice;
      Object.assign(this.form, fila);
    },

    eliminar(indice: number, fila: any) {
      console.warn("Eliminar curso aún no implementado", fila);
    },

    // 🔍 Mostrar nombres correctos
    carnetDocente(key: string) {
      return this.listadoDocentes.find((f: any) => f.id == key)?.carnet;
    },

    nombreMateria(key: string) {
      return this.listadoMaterias.find((f: any) => f.id == key)?.nombre;
    },

      asignarIdMateria(nombreSeleccionado: string) {
    const materia = this.listadoMaterias.find((m: any) => m.nombre === nombreSeleccionado);
    this.form.id_materia = materia ? materia.id : null;
  },
  asignarIdDocente(carnetSeleccionado: string) {
    const docente = this.listadoDocentes.find((d: any) => d.carnet === carnetSeleccionado);
    this.form.id_docente = docente ? docente.id : null;
  },
  },
});