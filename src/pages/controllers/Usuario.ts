import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Usuario",
  setup() {
    return {
      listadoUsuarios: [{
        rol: {
          label: "Estudiante",
          value: "estudiante",
        },
        correo: "correo@correo.com",
        contrasena: "1234",
        nombres: "Walter",
        apellidos: "Zelada"
      }],
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        rol: "",
        correo: "",
        contrasena: "",
        nombres: "",
        apellidos: "",
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
          value: "administrador",
        },
      ],
    };
  },
  methods: {
    async registrarUsuario() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {

        }
      });
    },
    editar(indice: number, fila: any) { },
    eliminar(indice: number, fila: any) { },
  },
  components: {},
});