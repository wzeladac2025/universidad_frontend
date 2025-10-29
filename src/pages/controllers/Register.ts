import { Loading } from "@/components/Loading";
import { LoginService } from "@/services/Login.service";
import { ArrowLeft, Check } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, reactive, ref, toRaw } from "vue";

export default defineComponent({
  name: "Register",
  setup() {
    return {
      checkIcon: Check,
      backIcon: ArrowLeft,
      formRef: ref<FormInstance>(),
      form: reactive({
        role: "",
        correo: "",
        nombres: "",
        apellidos: "",
        contrasena: "",
      }),
      rules: reactive<FormRules>({
        role: [
          {
            required: true,
            message: "Seleccione un perfil de usuario",
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
        nombres: [
          {
            required: true,
            message: "Los nombres del usuario son requeridos.",
            trigger: "blur",
          },
        ],
        apellidos: [
          {
            required: true,
            message: "Los apellidos del usuario son requeridos.",
            trigger: "blur",
          },
        ],
        contrasena: [
          {
            required: true,
            message: "La contrasena del usuario es requerida.",
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
      ],
      loginService: new LoginService(),
    };
  },
  methods: {
    async registerUser() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          let loading = Loading.loading("Registrando Usuario. Espere.");
          let data = JSON.stringify(this.form);
          this.loginService
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
                this.$router.push("/");
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
      });
    },
    regresar() {
      this.$router.push("/");
    },
  },
});
