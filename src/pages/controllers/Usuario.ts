import { Loading } from "@/components/Loading";
import { LoginService } from "@/services/Login.service";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";

export default defineComponent({
  name: "Usuario",
  setup() {

    const listadoUsuarios = ref([]);
    const usuarioService = new LoginService();

    const cargar = () => {
    usuarioService.obtener().then((respuesta: any) => {
    listadoUsuarios.value = respuesta;
    });
    }

    onBeforeMount(async () => {
    cargar();
    });

    return {
      listadoUsuarios,
      cargar,
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        role: "",
        correo: "",
        contrasena: "",
        nombre: "",
        apellido: "",
      }),
      rules: reactive<FormRules>({
        rol: [
          {
            required: true,
            message: "Seleccione un rol",
            trigger: "blur",
          },
        ],
        correo: [
          {
            required: true,
            message: "El correo de usuario es requerido.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "El correo debe ser válido.",
            trigger: ["blur", "change"],
          },
        ],
        contrasena: [
          {
            required: true,
            message: "La contrasena es requerida.",
            trigger: "blur",
          },
        ],
        nombres: [
          {
            required: true,
            message: "El nombre es requerido",
            trigger: "blur",
          },
        ],
        apellidos: [
          {
            required: true,
            message: "Los apellidos son requeridos",
            trigger: "blur",
          },
        ],
      }),
      perfiles: [
        {
          label: "Estudiante",
          value: "estudiante",
        },
        {
          label: "Docente",
          value: "docente",
        },
        {
          label: "Administrador",
          value: "admin",
        },
      ],
      usuarioService
    };
  },
  methods: {
    async registrarUsuario() {
                  if (!this.formRef) return;
                  await this.formRef.validate((valid) => {
                    if (valid) {
                      if (this.index == -1) {
                        let loading = Loading.loading("Registrando Usuario. Espere.");
                        let data = JSON.stringify(this.form);
                        this.usuarioService
                          .registrarUsuario(data)
                          .then(() => {
                            loading.close();
                            ElMessage({
                              message: "Usuario registrado.",
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
                      } 
                    }
                  });
                },
          editar(indice: number, fila: any) {
          this.index = indice;
          Object.assign(this.form, fila);
        },
    eliminar(indice: number, fila: any) { },
  },
  components: {},
});