import { createMemoryHistory, createRouter } from "vue-router";
import HomepageScreen from "../web/screens/homepage/homepage.vue";
import DenunciaListScreen from "../web/screens/denuncia/list/denuncia-list.vue";
import OrgaoListScreen from "../web/screens/orgao/list/orgao-list.vue";
import UsuarioListScreen from "../web/screens/usuarios/list/usuario-list.vue";
import TipoListScreen from "../web/screens/tipo/list/tipo-list.vue";
import LoginScreen from "../web/screens/login/login.vue";
import { getRoleFromToken } from "@/utils/get-role-from-token";

const routes = [
  {
    path: "/",
    component: LoginScreen,
  },
  {
    path: "/home",
    component: HomepageScreen,
  },

  {
    path: "/denuncia",
    component: DenunciaListScreen,
  },

  {
    path: "/orgao",
    component: OrgaoListScreen,
  },
  {
    path: "/usuario",
    component: UsuarioListScreen,
    beforeEnter: (to, from, next) => {
      const role = getRoleFromToken();
      if (role === "ROLE_ADMIN") {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/tipo",
    component: TipoListScreen,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
