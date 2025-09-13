import { Loading } from "@/components/Loading";
import { DArrowRight, Menu, User } from "@element-plus/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GeneralLayout",
  setup() {
    return {};
  },
  methods: {
    logout() {
      let loading = Loading.loading("Cerrando Sesión");
      setTimeout(() => {
        loading.close();
        this.$router.push("/");
      }, 3000);
    },
  },
  components: {
    Menu,
    User,
    DArrowRight,
  },
});
