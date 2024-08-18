<template>
  <Screen>
    <div v-if="loading" class="loading">Carregando...</div>
    <DenunciaForm :closeModal="closeModal" v-if="showModal" />
    <FeedbackResponse
      :closeModal="closeFeedbackResponseModal"
      v-if="feedbackResponseModal"
      :feedback="feedbackSelected"
    />
    <FeedbackForm
      :closeModal="closeFeedbackFormModal"
      v-if="feedbackFormModal"
      :denunciaId="denunciaId"
    />
    <div class="denuncia-list-header">
      <div class="denuncia-list-header-title-wrapper">
        <p class="denuncia-list-header-title">
          Bem-vindo à Seção de Cadastro de
        </p>
        <p class="denuncia-list-header-title-bold">Denúncias</p>
      </div>
      <p class="denuncia-list-header-description">
        Na nossa jornada para criar uma comunidade mais segura e justa, é
        fundamental dar voz às preocupações e relatos daqueles que testemunham
        ou experimentam situações injustas ou ilegais. Esta seção é um espaço
        dedicado para você fazer exatamente isso - registrar suas preocupações,
        denúncias ou observações sobre questões que merecem atenção.
      </p>
      <Button
        label="Cadastrar"
        color="#0095ff"
        style="margin: 24px 0 0"
        :onPress="toggleModal"
      />
    </div>
    <div class="denuncia-list-container">
      <div v-for="(group, date) in groupedDenuncias" :key="date">
        <p class="denuncia-list-date-label">{{ date }}</p>
        <div class="denuncia-list-row">
          <div
            v-for="denuncia in group"
            :key="denuncia.id"
            class="denuncia-list-item"
          >
            <div class="denuncia-list-item-wrapper">
              <div class="denuncia-list-header-top-wrapper">
                <p class="denuncia-list-item-title">{{ denuncia.titulo }}</p>
                <div class="denuncia-list-header-mode">
                  <fa
                    class="denuncia-list-icon"
                    @click="feedbackToggleModal(denuncia)"
                    icon="fa-comment"
                    style="color: #0095ff"
                  />
                  <fa
                    class="denuncia-list-icon"
                    @click="deleteDenuncia(denuncia.id)"
                    icon="fa-trash-can"
                    style="color: #ff0000"
                    v-if="canEditOrDelete"
                  />
                </div>
              </div>
              <p class="denuncia-list-item-description">{{ denuncia.texto }}</p>
            </div>
            <div class="denuncia-list-item-other-wrapper">
              <div class="denuncia-list-item-bottom-wrapper">
                <div class="denuncia-list-item-tipo-wrapper">
                  <fa icon="fa-circle-dot" />
                  <p class="denuncia-list-item-other">
                    {{ denuncia.tipo.nome }}
                  </p>
                </div>
                <div class="denuncia-list-item-orgao-wrapper">
                  <fa icon="fa-building" />
                  <p class="denuncia-list-item-other">
                    {{ denuncia.orgao.nome }}
                  </p>
                </div>
              </div>
              <div class="denuncia-list-item-status-wrapper">
                <div
                  :class="
                    'denuncia-list-item-status denuncia-list-item-status-' +
                    denuncia.urgencia
                  "
                />
                <p
                  :class="
                    'denuncia-list-item-status-label denuncia-list-item-status-label-' +
                    denuncia.urgencia
                  "
                >
                  {{ getUrgencyClass(denuncia.urgencia) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Screen>
</template>

<script>
import "./denuncia-list.styles.css";
import Screen from "@/components/screen/screen.vue";
import Button from "@/components/button/button.vue";
import DenunciaForm from "../form/denuncia-form.vue";
import FeedbackResponse from "../../feedback/response/feedback-response.vue";
import FeedbackForm from "../../feedback/form/feedback-form.vue";
import {
  getAllDenuncias,
  deleteDenuncia,
  getAllFeedback,
  getAllDenunciasByUser,
} from "./index";
import { computed, reactive, ref, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { getRoleFromToken } from "@/utils/get-role-from-token";

export default {
  name: "ReportFormScreen",
  components: {
    Screen,
    Button,
    DenunciaForm,
    FeedbackResponse,
    FeedbackForm,
  },
  data() {
    return {
      showModal: false,
      feedbackFormModal: false,
      feedbackResponseModal: false,
      feedbackSelected: {},
      denunciaId: null,
      feedbacksLoaded: false, // Adicionando estado para rastrear o carregamento de feedbacks
    };
  },
  setup() {
    const data = reactive({
      loading: false,
      canEditOrDelete: false,
    });
    const toast = useToast();
    const denuncias = ref([]);

    data.canEditOrDelete = getRoleFromToken() === "ROLE_ADMIN";

    const formatDate = (date) => {
      if (date.includes("T")) {
        date = date.split("T")[0];
      }
      const [year, month, day] = date.split("-");
      if (!year || !month || !day) {
        return date;
      }
      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      return `${parseInt(day, 10)} de ${
        months[parseInt(month, 10) - 1]
      } de ${year}`;
    };

    const groupedDenuncias = computed(() => {
      const groups = {};

      denuncias.value.forEach((denuncia) => {
        const date = formatDate(denuncia.data);
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(denuncia);
      });

      const sortedDates = Object.keys(groups).sort().reverse();
      const sortedGroups = {};
      sortedDates.forEach((date) => {
        sortedGroups[date] = groups[date];
      });

      return sortedGroups;
    });

    const fetchDenuncias = async () => {
      try {
        if (getRoleFromToken() === "ROLE_ADMIN") {
          const res = await getAllDenuncias();
          if (res.status === 200) {
            denuncias.value = res.data.map((denuncia) => {
              return {
                ...denuncia,
                data: formatDate(denuncia.data),
              };
            });
          } else {
            console.error("Erro ao obter as denúncias");
          }
        } else {
          const res = await getAllDenunciasByUser();
          if (res.status === 200) {
            denuncias.value = res.data.map((denuncia) => {
              return {
                ...denuncia,
                data: formatDate(denuncia.data),
              };
            });
          } else {
            console.error("Erro ao obter as denúncias");
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const res = await getAllFeedback();
        if (res.status === 200) {
          const fetchedFeedbacks = res.data;

          fetchedFeedbacks.forEach((feedback) => {
            const denunciaIndex = denuncias.value.findIndex(
              (denuncia) => denuncia.id === feedback.denuncia.id
            );
            if (denunciaIndex !== -1) {
              if (!denuncias.value[denunciaIndex].feedback) {
                denuncias.value[denunciaIndex].feedback = {
                  id: feedback.id,
                  texto: feedback.texto,
                };
              }
            }
          });
          this.feedbacksLoaded = true; // Atualizando o estado quando os feedbacks forem carregados
        } else {
          console.error("Erro ao obter os feedbacks");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    Promise.all([fetchDenuncias(), fetchFeedbacks()]);

    console.log(groupedDenuncias);

    return {
      groupedDenuncias,
      fetchDenuncias,
      fetchFeedbacks,
      ...toRefs(data),
      toast,
    };
  },
  methods: {
    getUrgencyClass(urgencia) {
      switch (urgencia) {
        case 1:
          return "Urgência muito baixa";
        case 2:
          return "Urgência baixa";
        case 3:
          return "Urgência média";
        case 4:
          return "Urgência alta";
        case 5:
          return "Urgência muito alta";
      }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async closeModal() {
      this.showModal = false;
      await this.fetchDenuncias();
      await this.fetchFeedbacks();
    },
    async closeFeedbackResponseModal() {
      this.feedbackResponseModal = false;
      await this.fetchDenuncias();
      await this.fetchFeedbacks();
    },
    async closeFeedbackFormModal() {
      this.feedbackFormModal = false;
      await this.fetchDenuncias();
      await this.fetchFeedbacks();
    },
    async feedbackToggleModal(denuncia) {
      if (!this.feedbacksLoaded) {
        await this.fetchFeedbacks();
      }
      if (denuncia.feedback) {
        this.feedbackSelected = denuncia.feedback;
        this.feedbackResponseModal = true;
        this.feedbackFormModal = false;
      } else {
        if (getRoleFromToken() === "ROLE_ADMIN") {
          this.denunciaId = denuncia.id;
          this.feedbackFormModal = true;
          this.feedbackResponseModal = false;
        }
        else {
          this.toast.error("Essa denúncia ainda não possui feedback.");
        
        }
      }
    },
    async deleteDenuncia(denunciaId) {
      try {
        this.loading = true;
        const res = await deleteDenuncia(denunciaId);

        if (res.status === 200) {
          this.loading = false;
          this.toast.success(res.data);
          this.fetchDenuncias();
          await this.fetchFeedbacks();
        } else {
          this.loading = false;
          this.toast.error("Erro ao deletar a denúncia");
        }
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao deletar a denúncia");
        console.error(error.message);
      }
    },
  },
};
</script>
