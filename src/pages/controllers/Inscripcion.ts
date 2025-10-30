import { CarreraService } from "@/services/Carrera.service";
import { CursoService } from "@/services/Curso.service";
import { MateriaService } from "@/services/Materia.service";
import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";

export default defineComponent({
  name: "Acceso",
  setup() {
    const listadoCarreras: any = ref([]);
    const listadoMaterias: any = ref([]);
    const listadoCursos: any = ref([]);
    const carreraService = new CarreraService();
    const materiaService = new MateriaService();
    const cursoService = new CursoService();
    const cursos: any = ref([]);

    const cargar = () => {
      carreraService.obtener().then((respuesta: any) => {
        listadoCarreras.value = respuesta;
      });

      cursoService.obtener().then((respuesta: any) => {
        listadoCursos.value = respuesta;
        materiaService.obtener().then((respuesta: any) => {
          listadoMaterias.value = respuesta;

          listadoCursos.value.forEach((curso: any) => {
            cursos.value.push({
              key: curso.id,
              label: listadoMaterias.value.find((materia: any) => materia.id == curso.id_materia).nombre
            });
          });
        });
      })
    };

    onBeforeMount(async () => {
      cargar();
    });

    return {
      listadoCarreras,
      listadoCursos,
      cursos,
      tiposPago: [
        {
          key: 1,
          label: "Paypal",
        },
        {
          key: 2,
          label: "Tarjeta de Credito / Debito",
        },
      ],
      mostrarDialogoPago: ref(false),
      tipoPago: ref(0),
      formRef: ref<FormInstance>(),
      formRefPago: ref<FormInstance>(),
      form: reactive({
        carrera: "",
        semestre: "",
        cursos: [],
        monto: 100,
      }),
      formPago: reactive({
        tipoPago: ref(),
        correo: "",
        descripcionPago: "",
        monto: 0,
        nombreTarjeta: "",
        numeroTarjeta: "",
        expiracion: "",
        cvv: "",
      }),
      rules: reactive<FormRules>({
        carrera: [
          {
            required: true,
            message: "Seleccione la carrera",
            trigger: "blur",
          },
        ],
        semestre: [
          {
            required: true,
            message: "El semestre es requerido",
            trigger: "blur",
          },
        ],
        cursos: [
          {
            required: true,
            message: "Debe seleccionar al menos un curso del semestre indicado",
            trigger: "change",
          },
        ],
      }),
      rulesPago: reactive<FormRules>({
        tipoPago: [
          {
            required: true,
            message: "Seleccione un metodo de pago",
            trigger: "blur",
          },
        ],
        correo: [
          {
            required: true,
            message: "El correo de usuario de paypal es requerido.",
            trigger: "blur",
          },
          {
            type: "email",
            message: "El correo debe ser válido.",
            trigger: ["blur", "change"],
          },
        ],
        descripcionPago: [
          {
            required: true,
            message: "Seleccione un metodo de pago",
            trigger: "blur",
          },
        ],
        monto: [
          {
            required: false,
          },
        ],
        nombreTarjeta: [
          {
            required: true,
            message: "Ingrese el nombre del titular",
            trigger: "blur",
          },
        ],
        numeroTarjeta: [
          {
            required: true,
            message: "Ingrese el número de tarjeta",
            trigger: "blur",
          },
          {
            pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/,
            message: "Formato inválido",
            trigger: "blur",
          },
        ],
        expiracion: [
          {
            required: true,
            message: "Ingrese la fecha de expiración",
            trigger: "blur",
          },
          {
            pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
            message: "Formato inválido (MM/AA)",
            trigger: "blur",
          },
        ],
        cvv: [
          { required: true, message: "Ingrese el CVV", trigger: "blur" },
          {
            pattern: /^\d{3,4}$/,
            message: "Debe tener 3 o 4 dígitos",
            trigger: "blur",
          },
        ],
      }),
    };
  },
  methods: {
    async realizarInscripcion() {
      if (!this.formRef) return;
      this.modalPago(); //MOVER AL FORMULARIO VALIDO CUANDO YA SE INTEGRE SERVICIO
      await this.formRef.validate((valid) => {
        if (valid) {
        }
      });
    },
    filtrarCurso(query: any, item: any) {
      return item.label.toLowerCase().includes(query.toLowerCase());
    },
    modalPago() {
      this.formPago.monto = this.form.monto;
      this.mostrarDialogoPago = true;
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
    habilitarCampos() {
      this.tipoPago = this.formPago.tipoPago?.key;
    },
    confirmarPago() { },
    formatNumeroTarjeta() {
      this.formPago.numeroTarjeta = this.formPago.numeroTarjeta
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
    },
    formatExpiracion() {
      this.formPago.expiracion = this.formPago.expiracion
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
        .substr(0, 5);
    },
  },
  components: {},
});
