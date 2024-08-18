<template>
  <Screen>
    <TipoForm :closeModal="closeModal" v-if="showModal" :id="id" />
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="tipo-list-header">
      <div class="tipo-list-header-title-wrapper">
        <p class="tipo-list-header-title">Bem-vindo à Seção de Cadastro de</p>
        <p class="tipo-list-header-title-bold">Tipos</p>
      </div>
      <p class="tipo-list-header-description">
        Na nossa jornada para criar uma comunidade mais segura e justa,
        reconhecemos a importância de dar voz às diversas preocupações e relatos
        que permeiam nossa sociedade. Esta seção é um espaço dedicado para você
        registrar diferentes tipos de denúncias, contribuindo para a promoção da
        igualdade, justiça e bem-estar de todos.
      </p>
      <p class="tipo-list-header-description">
        Cada denúncia é uma peça importante no quebra-cabeça da justiça e da
        igualdade. Agradecemos por sua coragem em compartilhar suas preocupações
        e contribuir para a construção de uma comunidade mais segura e
        acolhedora para todos.
      </p>
      <Button
        label="Cadastrar"
        color="#0095ff"
        style="margin: 24px 0 0"
        :onPress="toggleModal"
        v-if="canCreateEditOrDelete"
      />
    </div>
    <div class="tipo-list-container">
      <div v-for="(tipos, letter, index) in groupedTipos" :key="index">
        <p class="tipo-list-label">{{ letter }}</p>
        <div class="tipo-list-row">
          <div v-for="tipo in tipos" :key="tipo.id" class="tipo-list-item">
            <div class="tipo-list-item-wrapper">
              <fa icon="fa-circle-dot" />
              <p class="tipo-list-item-title">{{ tipo.nome }}</p>
            </div>
            <div class="tipo-list-header-mode">
              <fa
                class="tipo-list-icon"
                icon="fa-pencil"
                style="color: #ffd43b"
                v-if="canCreateEditOrDelete"
                @click="editTipo(tipo)"
              />
              <fa
                class="tipo-list-icon"
                @click="deleteTipo(tipo.id)"
                icon="fa-trash-can"
                style="color: #ff0000"
                v-if="canCreateEditOrDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Screen>
</template>

<script>
import "./tipo-list.styles.css";
import Button from "@/components/button/button.vue";
import Screen from "@/components/screen/screen.vue";
import TipoForm from "../form/tipo-form.vue";
import { computed, reactive, ref, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { getAllTipo, deleteTipo } from "./index";
import { getRoleFromToken } from "@/utils/get-role-from-token";

export default {
  name: "TipoListScreen",
  components: {
    Button,
    Screen,
    TipoForm,
  },
  data() {
    return {
      showModal: false,
      id: "",
    };
  },
  setup() {
    const data = reactive({
      nome: "",
      loading: false,
      canCreateEditOrDelete: false,
    });
    const tipoOptions = ref([]);
    const toast = useToast();

    data.canCreateEditOrDelete = getRoleFromToken() === "ROLE_ADMIN";

    const groupedTipos = computed(() => {
      const groups = {};

      tipoOptions.value.forEach((tipo) => {
        const nome = tipo.nome[0].toUpperCase();
        if (!groups[nome]) {
          groups[nome] = [];
        }
        groups[nome].push(tipo);
      });

      const sortedTipos = Object.keys(groups).sort();
      const sortedGroups = {};
      sortedTipos.forEach((nome) => {
        sortedGroups[nome] = groups[nome];
      });

      return sortedGroups;
    });

    async function fetchTipo() {
      try {
        const res = await getAllTipo();
        if (res.status === 200) {
          tipoOptions.value = res.data;
        } else {
          console.error("Erro ao obter os tipos de denúncias");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchTipo();

    return { ...toRefs(data), toast, groupedTipos, fetchTipo };
  },
  methods: {
    async deleteTipo(id) {
      try {
        this.loading = true;
        const res = await deleteTipo(id);
        if (res.status === 200) {
          this.loading = false;
          this.toast.success("Tipo de denúncia deletado com sucesso");
          this.fetchTipo();
        } else {
          this.loading = false;
          this.toast.error("Erro ao deletar o tipo de denúncia");
        }
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao deletar o tipo de denúncia");
      }
    },
    async editTipo(tipo) {
      console.log(tipo);
      this.id = String(tipo.id);
      this.showModal = true;
    },
    toggleModal() {
      this.id = undefined;
      this.showModal = !this.showModal;
    },
    async closeModal() {
      this.showModal = false;
      await this.fetchTipo();
    },
  },
};
</script>
