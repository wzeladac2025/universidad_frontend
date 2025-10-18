import type { FormInstance } from "element-plus";
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "Curso",
  setup() {
    return {
      formRef: ref<FormInstance>(),
      form: reactive({
        materia: "",
        docente: "",
        periodo: "",
        seccion: "",
        cupo: 0,
      }),
      rules: {},
    };
  },
  methods: {},
  components: {},
});