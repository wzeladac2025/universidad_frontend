import { Loading } from "@/components/Loading";
import { CarreraService } from "@/services/Carrera.service";
import { MateriaService } from "@/services/Materia.service";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { defineComponent, onBeforeMount, reactive, ref } from "vue";

export default defineComponent({
  name: "Materia",
  setup() {
    const listadoMaterias = ref([]);
    const listadoCarreras: any = ref([]);
    
    const materiaService = new MateriaService();
    const carreraService = new CarreraService();

    const cargar = () => {
      materiaService.obtener().then((respuesta: any) => {
        listadoMaterias.value = respuesta;
      });

      carreraService.obtener().then((respuesta: any) => {
        listadoCarreras.value = respuesta;
      });
    };

    onBeforeMount(async () => {
      cargar();
    });

    return {
      listadoMaterias,
      listadoCarreras,
      cargar,
      index: -1,
      formRef: ref<FormInstance>(),
      form: reactive({
        id: 0,
        nombre_carrera: null,
        nombre: "",
        credito: 0,
        semestre: null,
        obligatoriedad: null,
      }),
      rules: reactive<FormRules>({
        id_carrera: [
          {
            required: true,
            message: "Seleccione una carera",
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
        credito: [
          {
            required: true,
            message: "El credito es requerida",
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
        obligatoriedad: [
          {
            required: true,
            message: "La obligatoriedad es requerida",
            trigger: "blur",
          },
        ],
      }),
      materiaService,
      carreraService,
    };
  },
  methods: {
    async registrarMateria() {
      if (!this.formRef) return;
      await this.formRef.validate((valid) => {
        if (valid) {
          if (this.index == -1) {
            let loading = Loading.loading("Registrando Materia. Espere.");
            let data = JSON.stringify(this.form);
            this.materiaService
              .registrar(data)
              .then(() => {
                loading.close();
                ElMessage({
                  message: "Materia registrada.",
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
            this.materiaService
              .actualizar(this.form.id, data)
              .then(() => {
                loading.close();
                ElMessage({
                  message: "Materia actualizada.",
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
    nombreCarrera(key: string) {
      return this.listadoCarreras.find((f: any) => f.id == key)?.nombre;
    },
    nombreObligatoriedad(key: string) {
      return key ? "SI" : "NO";
    },
  },
  components: {},
});
