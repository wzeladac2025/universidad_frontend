import { Loading } from "@/components/Loading";
import { CarreraService } from "@/services/Carrera.service";
import { DocenteService } from "@/services/Docente.service";
import { LoginService } from "@/services/Login.service";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";

export default defineComponent({
  name: "Docente",
  setup() {
  const listadoDocentes = ref([]);
  const docenteService = new DocenteService();

  const listadoCarreras: any = ref([]);
  const carreraService = new CarreraService();

  const listadoUsuarios: any = ref([]);
  const usuarioService = new LoginService();
  
  const cargar = () => {
      docenteService.obtener().then((respuesta: any) => {
      listadoDocentes.value = respuesta;
      });

      carreraService.obtener().then((respuesta: any) => {
      listadoCarreras.value = respuesta;
      });

      usuarioService.obtenerDocentes().then((respuesta: any) => {
      listadoUsuarios.value = respuesta;
      });
    };

    onBeforeMount(async () => {
    cargar();
    });

  
    return {
      cargar,
      listadoDocentes,
      listadoCarreras,
      listadoUsuarios,
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        id: 0,
        DPI: "", 
        nombre: "",
        apellido: "",
        fechaNacimiento: "",
        id_carrera: 0,
        id_usuario: 0,
        sueldo: 0,
        genero: null,
        status: true,
      }),
      rules: reactive<FormRules>({
        dpi: [
          {
            required: true,
            message: "El numero DPI del docente es requeridos.",
            trigger: "blur",
          },
        ],
        nombres: [
          {
            required: true,
            message: "Los nombres del docente son requeridos.",
            trigger: "blur",
          },
        ],
        apellidos: [
          {
            required: true,
            message: "Los apellidos del docente son requeridos.",
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
          label: "Activo",
          value: true,
        },
        {
          label: "No Activo",
          value: false,
        },
      ],
      docenteService,
      carreraService,
      usuarioService
    };
  },
  methods: {
    async registrarDocente() {
          if (!this.formRef) return;
          await this.formRef.validate((valid) => {
            if (valid) {
              if (this.index == -1) {
                let loading = Loading.loading("Registrando Docente. Espere.");
                let data = JSON.stringify(this.form);
                this.docenteService
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
                this.docenteService
                  .actualizar(this.form.id, data)
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
        periodo(periodo: Date[]) {
      return (
        periodo[0].getHours() +
        ":" +
        periodo[0].getMinutes() +
        " hasta " +
        periodo[1].getHours() +
        ":" +
        periodo[1].getMinutes()
      );
    },
        editar(indice: number, fila: any) {
      this.index = indice;
      Object.assign(this.form, fila);
    },
    eliminar(indice: number, fila: any) {},
  },
  components: {},
});
