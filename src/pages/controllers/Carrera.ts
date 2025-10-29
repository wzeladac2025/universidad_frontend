import { Loading } from "@/components/Loading";
import { CarreraService } from "@/services/Carrera.service";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref, toRaw } from "vue";

export default defineComponent({
  name: "Curso",
  setup() {
    const listadoCarreras = ref([]);
    const facultades = [
      {
        label: "Facultad de Ingenieria",
        value: "INGENIERIA",
      },
      {
        label: "Facultad de Arquitectura",
        value: "ARQUITECTURA",
      },
      {
        label: "Facultad de Medicina",
        value: "MEDICINA",
      },
      {
        label: "Facultad de Derecho",
        value: "DERECHO",
      },
    ];
    const carreraService = new CarreraService();

    const cargar = () => {
      carreraService.obtener().then((respuesta: any) => {
        listadoCarreras.value = respuesta;
      });
    };

    onBeforeMount(async () => {
      cargar();
    });

    return {
      listadoCarreras,
      facultades,
      cargar,
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        id: 0,
        facultad: "",
        nombre: "",
        duracion: 0,
      }),
      rules: reactive<FormRules>({
        facultad: [
          {
            required: true,
            message: "Seleccione una facultad",
            trigger: "blur",
          },
        ],
        nombre: [
          {
            required: true,
            message: "El nombre es requerido",
            trigger: "blur",
          },
        ],
        duracion: [
          {
            required: true,
            message: "La duracion es requerida",
            trigger: "blur",
          },
        ],
      }),
      carreraService,
    };
  },
  methods: {
    async registrarCarrera() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          if (this.index == -1) {
            let loading = Loading.loading("Registrando Carrera. Espere.");
            let data = JSON.stringify(this.form);
            this.carreraService
              .registrar(data)
              .then(() => {
                loading.close();
                ElMessage({
                  message: "Carrera registrada.",
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
            let loading = Loading.loading("Actualizando Carrera. Espere.");
            let data = JSON.stringify(this.form);
            this.carreraService
              .actualizar(this.form.id, data)
              .then(() => {
                loading.close();
                ElMessage({
                  message: "Carrera actualizada.",
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
    nombreFacultad(key: string) {
      return this.facultades.find((f) => f.value == key)?.label;
    },
    editar(indice: number, fila: any) {
      this.index = indice;
      Object.assign(this.form, fila);
    },
    eliminar(indice: number, fila: any) {},
  },
  components: {},
});
