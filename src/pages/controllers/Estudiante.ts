import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { EstudianteService } from "@/services/Estudiante.service";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";
import { LoginService } from "@/services/Login.service";
import { Loading } from "@/components/Loading";

export default defineComponent({
  name: "Estudiante",
  setup() {
      const listadoEstudiantes = ref([]);
      const estudianteService = new EstudianteService();

        const listadoUsuarios: any = ref([]);
        const usuarioService = new LoginService();

      const cargar = () => {
      estudianteService.obtener().then((respuesta: any) => {
      listadoEstudiantes.value = respuesta;
      });

      usuarioService.obtenerEstudiantes().then((respuesta: any) => {
      listadoUsuarios.value = respuesta;
      });
    };  

    onBeforeMount(async () => {
    cargar();
    });
    
    return {
      listadoEstudiantes,
      listadoUsuarios,
      cargar,
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        id: 0,
        carnet: "",
        DPI: "", 
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        id_usuario: 0,
        genero: null,
      }),
      rules: reactive<FormRules>({
        nombres: [
          {
            required: true,
            message: "Los nombres del estudiante son requeridos.",
            trigger: "blur",
          },
        ],
        apellidos: [
          {
            required: true,
            message: "Los apellidos del estudiante son requeridos.",
            trigger: "blur",
          },
        ],
        estado: [
          {
            required: true,
            message: "El estado es requerido.",
            trigger: "blur",
          },
        ],
      }),
      estados: [
        {
          label: "Inscrito",
          value: true,
        },
        {
          label: "No Inscrito",
          value: false,
        },
      ],
      estudianteService,
      usuarioService
    };
  },
  methods: {
    async registrarEstudiante() {
              if (!this.formRef) return;
              await this.formRef.validate((valid) => {
                if (valid) {
                  if (this.index == -1) {
                    let loading = Loading.loading("Registrando Docente. Espere.");
                    let data = JSON.stringify(this.form);
                    this.estudianteService
                      .registrar(data)
                      .then(() => {
                        loading.close();
                        ElMessage({
                          message: "Docente registrado.",
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
                          message: error.mensaje,
                          type: "error",
                          plain: true,
                        });
                      });
                  } else {
                    let loading = Loading.loading("Actualizando Materia. Espere.");
                    let data = JSON.stringify(this.form);
                    this.estudianteService
                      .actualizar(this.form.carnet, data)
                      .then(() => {
                        loading.close();
                        ElMessage({
                          message: "Docente actualizad0.",
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
                          message: error.mensaje,
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
    eliminar(indice: number, fila: any) {},
  },
  components: {},
});
