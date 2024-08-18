<template>
  <Screen>
    <OrgaoForm :closeModal="closeModal" v-if="showModal" :id="id" />
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="orgao-list-header">
      <div class="orgao-list-header-title-wrapper">
        <p class="orgao-list-header-title">Bem-vindo à Seção de Cadastro de</p>
        <p class="orgao-list-header-title-bold">Orgãos</p>
      </div>
      <p class="orgao-list-header-description">
        Na nossa jornada para criar uma comunidade mais segura e justa, é
        fundamental dar voz às preocupações e relatos daqueles que testemunham
        ou experimentam situações injustas ou ilegais. Esta seção é um espaço
        dedicado para você fazer exatamente isso - registrar suas preocupações,
        denúncias ou observações sobre questões que merecem atenção.
      </p>
      <p class="orgao-list-header-description">
        Se você estiver enfrentando uma situação que considere injusta ou ilegal
        e deseja tomar medidas para solucioná-la, abaixo estão os contatos dos
        órgãos responsáveis por receber e investigar denúncias
      </p>
      <Button
        label="Cadastrar"
        color="#0095ff"
        style="margin: 24px 0 0"
        :onPress="toggleModal"
        v-if="canCreateEditOrDelete"
      />
    </div>
    <div class="orgao-list-container">
      <div v-for="(orgaos, letter, index) in groupedOrgaos" :key="index">
        <p class="orgao-list-label">{{ letter }}</p>
        <div class="orgao-list-row">
          <div v-for="orgao in orgaos" :key="orgao.id" class="orgao-list-item">
            <div class="orgao-list-item-wrapper">
              <fa icon="fa-building" />
              <p class="orgao-list-item-title">{{ orgao.nome }}</p>
            </div>
            <div class="orgao-list-header-mode">
              <fa
                class="orgao-list-icon"
                icon="fa-pencil"
                style="color: #ffd43b"
                v-if="canCreateEditOrDelete"
                @click="editOrgao(orgao)"
              />
              <fa
                class="orgao-list-icon"
                @click="deleteOrgao(orgao.id)"
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
import "./orgao-list.styles.css";
import Button from "@/components/button/button.vue";
import Screen from "@/components/screen/screen.vue";
import OrgaoForm from "../form/orgao-form.vue";
import { computed, reactive, ref, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { getAllOrgao, deleteOrgao } from "./index";
import { getRoleFromToken } from "@/utils/get-role-from-token";

export default {
  name: "OrgaoListScreen",
  components: {
    Button,
    Screen,
    OrgaoForm,
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
    const orgaoOptions = ref([]);
    const toast = useToast();

    data.canCreateEditOrDelete = getRoleFromToken() === "ROLE_ADMIN";

    const groupedOrgaos = computed(() => {
      const groups = {};

      orgaoOptions.value.forEach((orgao) => {
        const nome = orgao.nome[0].toUpperCase();
        if (!groups[nome]) {
          groups[nome] = [];
        }
        groups[nome].push(orgao);
      });

      const sortedOrgaos = Object.keys(groups).sort();
      const sortedGroups = {};
      sortedOrgaos.forEach((nome) => {
        sortedGroups[nome] = groups[nome];
      });

      return sortedGroups;
    });

    async function fetchOrgao() {
      try {
        const res = await getAllOrgao();
        if (res.status === 200) {
          orgaoOptions.value = res.data;
        } else {
          console.error("Erro ao obter os órgãos");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchOrgao();

    return { ...toRefs(data), toast, groupedOrgaos, fetchOrgao };
  },
  methods: {
    async deleteOrgao(orgaoId) {
      try {
        this.loading = true;
        const res = await deleteOrgao(orgaoId);
        if (res.status === 200) {
          this.loading = false;
          this.toast.success("Órgão deletado com sucesso");
          this.fetchOrgao();
        } else {
          this.loading = false;
          this.toast.error("Erro ao deletar o órgão");
        }
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao deletar o órgão");
      }
    },
    async editOrgao(orgao) {
      this.id = String(orgao.id);
      this.showModal = true;
    },
    toggleModal() {
      this.id = undefined;
      this.showModal = !this.showModal;
    },
    async closeModal() {
      this.showModal = false;
      await this.fetchOrgao();
    },
  },
};
</script>
