import { Loading } from "@/components/Loading";
import { BackendApiService } from "@/services/BackendApi.service";
import { BdService } from "@/services/bd.service";
import { LoginService } from "@/services/Login.service";
import { Lock, User, Check, Plus } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {
      userIcon: User,
      lockIcon: Lock,
      loginIcon: Check,
      registerIcon: Plus,
      formRef: ref<FormInstance>(),
      form: reactive({
        correo: "",
        role: "",
        contrasena: "",
      }),
      rules: reactive<FormRules>({
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
        role: [
          {
            required: true,
            message: "Seleccione un perfil de usuario.",
            trigger: "change",
          },
        ],
        contrasena: [
          {
            required: true,
            message: "La contrasena es requerida.",
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
      loginService: new LoginService(),
      bdService: new BdService(),
    };
  },
  methods: {
    async login() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          let data = JSON.stringify(this.form);
          let loading = Loading.loading("Iniciando Sesión");
          this.loginService
            .autenticarUsuario(data)
            .then((respuesta: any) => {
              BackendApiService.access_token = respuesta.access_token;
              this.loginService
                .obtenerUsuario(respuesta.idUsuario)
                .then((usuario: any) => {
                  this.bdService
                    .delete(this.bdService.db, "usuario")
                    .then(() => {
                      let doc = {
                        _id: "usuario",
                        usuario: usuario,
                      };

                      this.bdService.save(this.bdService.db, doc).then(() => {
                        loading.close();
                        this.$router.push("/general/home");
                      });
                    });
                })
                .catch((error) => {
                  loading.close();
                  ElMessage({
                    message: error.mensaje,
                    type: "error",
                    plain: true,
                  });
                });
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
      });
    },

    register() {
      this.$router.push("/register");
    },
    obtenerPerfilLabel(value: string): string | undefined {
      const perfil = this.perfiles.find((perfil) => perfil.value == value);
      return perfil?.label;
    },
  },
});
