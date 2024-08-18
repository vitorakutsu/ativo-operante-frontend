<template>
  <div class="screen-container">
    <div class="screen-options-wrapper">
      <RouterLink class="screen-title" to="/home">Ativo e Operante</RouterLink>
      <RouterLink class="screen-options" to="/denuncia">Denúncias</RouterLink>
      <RouterLink class="screen-options" to="/orgao">Orgãos</RouterLink>
      <RouterLink class="screen-options" to="/tipo">Tipos</RouterLink>
      <RouterLink class="screen-options" to="/usuario" v-if="canSeeUserMenu"
        >Usuários</RouterLink
      >
    </div>
    <fa
      icon="fa-right-from-bracket"
      size="xl"
      @click="logout"
      class="logout"
    />
  </div>
  <div class="slot-content">
    <slot>
      <RouterView />
    </slot>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import "./screen.styles.css";
import { getRoleFromToken } from "@/utils/get-role-from-token";

export default {
  name: "ScreenComponent",
  setup() {
    const canSeeUserMenu = getRoleFromToken() === "ROLE_ADMIN";
    console.log(getRoleFromToken());
    return { canSeeUserMenu };
  },
  components: {
    RouterLink,
    RouterView,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
