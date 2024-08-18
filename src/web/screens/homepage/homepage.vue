<template>
  <Screen>
    <div class="homepage-header">
      <div class="homepage-header-title-wrapper">
        <p class="homepage-header-title">Bem-vindo ao Sistema</p>
        <p class="homepage-header-title-bold">Ativo e Operante</p>
      </div>
      <p class="homepage-header-description">
        Ativo e Operante! é um sistema Web capaz de oferecer uma ferramenta ao
        cidadão que deseja avisar ou denunciar aos orgãos competentes sobre
        problemas na cidade, como buracos na rua, abandono de animais, poda ou
        corte de árvores, problemas no trânsito, enfim qualquer situação que
        pode afetar o dia a dia do cidadão.
      </p>
    </div>
    <div class="carousel">
      <div class="slides">
        <div
          v-for="(slide, index) in filteredSlides"
          :key="index"
          class="slide"
        >
          <RouterLink class="slider-container" :to="slide.path">
            <fa :icon="['fas', slide.icon]" class="slider-icon" />
            <p class="slider-title">{{ slide.title }}</p>
          </RouterLink>
        </div>
      </div>
    </div>
  </Screen>
</template>

<script>
import "./homepage.styles.css";
import { RouterLink } from "vue-router";
import Screen from "@/components/screen/screen.vue";
import { getRoleFromToken } from "@/utils/get-role-from-token";

export default {
  name: "HomepageScreen",
  data() {
    const role = getRoleFromToken();
    return {
      role,
      slides: [
        {
          path: "/denuncia",
          title: "Denúncias",
          icon: "fa-bullhorn",
        },
        {
          path: "/orgao",
          title: "Orgãos",
          icon: "fa-building",
        },
        {
          path: "/usuario",
          title: "Usuários",
          icon: "fa-users",
          adminOnly: true,
        },
        {
          path: "/tipo",
          title: "Tipos",
          icon: "fa-tags",
        },
      ],
    };
  },
  computed: {
    filteredSlides() {
      if (this.role === "ROLE_ADMIN") {
        return this.slides;
      } else {
        return this.slides.filter((slide) => !slide.adminOnly);
      }
    },
  },
  components: {
    RouterLink,
    Screen,
  },
};
</script>
