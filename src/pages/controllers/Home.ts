import { BdService } from "@/services/bd.service";
import { defineComponent, onBeforeMount, ref } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const bdService = new BdService();
    let nombre = ref("");
    let role = ref("");

    onBeforeMount(async () => {
      bdService.read(bdService.db, "usuario").then((doc: any) => {
        nombre.value = doc.usuario.nombres + " " + doc.usuario.apellidos;
        role.value = doc.usuario.role;
      });
    });
    return {
      nombre,
      role
    };
  },
  methods: {},
  components: {},
});
