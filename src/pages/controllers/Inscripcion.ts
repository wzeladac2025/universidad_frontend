import type { FormInstance, FormRules } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import { pay } from "../../services/stripe.service";

interface Curso {
  key: number;
  label: string;
}

interface TipoPago {
  key: number;
  label: string;
}

export default defineComponent({
  name: "Acceso",
  setup() {
    const cursos: Curso[] = [
      { key: 1, label: "Desarrollo Web" },
      { key: 2, label: "Analisis de Sistemas II" },
      { key: 3, label: "Etica Profesional" },
      { key: 4, label: "Redes de computadoras I" },
      { key: 5, label: "Arquitectura de computadoras II" },
    ];

    const tiposPago: TipoPago[] = [
      { key: 1, label: "Paypal" },
      { key: 2, label: "Tarjeta de Credito / Debito" },
    ];

    const mostrarDialogoPago = ref(false);
    const tipoPago = ref<number>(0);

    const formRef = ref<FormInstance>();
    const formRefPago = ref<FormInstance>();

    const form = reactive({
      carrera: "",
      semestre: "",
      cursos: [] as Curso[],
      monto: 100,
    });

    const formPago = reactive({
      tipoPago: undefined as TipoPago | undefined,
      correo: "",
      descripcionPago: "",
      monto: 0,
      nombreTarjeta: "",
      numeroTarjeta: "",
      expiracion: "",
      cvv: "",
    });

    const rules: FormRules = reactive({
      carrera: [{ required: true, message: "Seleccione la carrera", trigger: "blur" }],
      semestre: [{ required: true, message: "El semestre es requerido", trigger: "blur" }],
      cursos: [
        { required: true, message: "Debe seleccionar al menos un curso del semestre indicado", trigger: "change" },
      ],
    });

    const rulesPago: FormRules = reactive({
      tipoPago: [{ required: true, message: "Seleccione un metodo de pago", trigger: "blur" }],
      correo: [
        { required: true, message: "El correo de usuario de paypal es requerido.", trigger: "blur" },
        { type: "email", message: "El correo debe ser válido.", trigger: ["blur", "change"] },
      ],
      descripcionPago: [{ required: true, message: "Seleccione un metodo de pago", trigger: "blur" }],
      nombreTarjeta: [{ required: true, message: "Ingrese el nombre del titular", trigger: "blur" }],
      numeroTarjeta: [
        { required: true, message: "Ingrese el número de tarjeta", trigger: "blur" },
        { pattern: /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, message: "Formato inválido", trigger: "blur" },
      ],
      expiracion: [
        { required: true, message: "Ingrese la fecha de expiración", trigger: "blur" },
        { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Formato inválido (MM/AA)", trigger: "blur" },
      ],
      cvv: [
        { required: true, message: "Ingrese el CVV", trigger: "blur" },
        { pattern: /^\d{3,4}$/, message: "Debe tener 3 o 4 dígitos", trigger: "blur" },
      ],
    });

    return {
      cursos,
      tiposPago,
      mostrarDialogoPago,
      tipoPago,
      formRef,
      formRefPago,
      form,
      formPago,
      rules,
      rulesPago,
    };
  },
  methods: {
    async realizarInscripcion() {
      if (!this.formRef) return;

      await this.formRef.validate(async (valid) => {
        if (valid) {
          this.modalPago();
        }
      });
    },

    modalPago() {
      this.formPago.monto = this.form.monto;
      this.tipoPago = this.formPago.tipoPago?.key ?? 0;
      this.mostrarDialogoPago = true;
    },

    habilitarCampos() {
      this.tipoPago = this.formPago.tipoPago?.key ?? 0;
    },

    filtrarCurso(query: string, item: Curso) {
      return item.label.toLowerCase().includes(query.toLowerCase());
    },

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

    /** Función de pago integrada con Stripe */
  /** Función de pago integrada con Stripe */
async confirmarPago() {
  if (!this.formRefPago) return;

  await this.formRefPago.validate(async (valid) => {
    if (!valid) return;

    try {
      // TODO: Reemplazar con datos reales del usuario logueado
      const userId = "c3c9d5e2-9f7b-4f9e-9b2d-6b1d6e77b1ac"; // Id del usuario
      const nit = "CF";         // NIT del usuario o "CF" si no quiere facturar

      // Mapear cursos seleccionados a items
      const items = this.form.cursos
        .map((keyOrObj: any) => {
          if (keyOrObj?.key && keyOrObj?.label) return keyOrObj;
          return this.cursos.find((c: any) => c.key === keyOrObj);
        })
        .filter(Boolean) // eliminar undefined
        .map((c: any) => ({
          id: c.key.toString(),
          name: c.label,
          quantity: 1,
          price: this.form.monto,
        }));

      // Llamada al servicio de pago
      await pay({ userId, nit, items });

      // Si llega aquí, la función pay ya redirigió al usuario
      this.mostrarDialogoPago = false;
    } catch (error: any) {
      console.error(error);
    }
  });
}


  },
});
