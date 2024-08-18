<template>
  <div class="feedback-form-modal">
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="feedback-form-modal-content">
      <div class="feedback-form-modal-header">
        <div class="feedback-form-title-wrapper">
          <p class="feedback-form-title">Resposta do</p>
          <p class="feedback-form-title-bold">Feedback</p>
        </div>
        <p class="feedback-form-description">
          Valorizamos sua opinião! Se você tiver alguma sugestão, crítica ou
          elogio sobre nossa plataforma de denúncias, por favor, compartilhe
          conosco. Seu feedback é fundamental para nos ajudar a melhorar e
          aprimorar nossos serviços. Agradecemos por dedicar um momento para nos
          contar sobre sua experiência.
        </p>
      </div>
      <div class="feedback-form-divider" />
      <div class="feedback-form-content">
        <div class="feedback-form-row">
          <TextArea
            label="Descrição"
            placeholder="Digite um texto para o feedback:"
            v-model="texto"
            required="true"
          />
        </div>
      </div>
      <div class="feedback-form-divider" />
      <div class="feedback-form-button-wrapper">
        <FullButton
          label="Cadastrar Feedback"
          color="#0095ff"
          :onPress="handleCreate"
        />
        <FullButton
          label="Cancelar"
          :onPress="this.closeModal"
          color="#ff0000"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "./feedback-form.styles.css";
import TextArea from "@/components/text-area/text-area.vue";
import FullButton from "@/components/full-button/full-button.vue";
import { createFeedback } from "./index";
import { reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";

export default {
  name: "FeedbackForm",
  components: {
    TextArea,
    FullButton,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    denunciaId: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const data = reactive({
      texto: "",
      loading: false,
    });
    const toast = useToast();

    return { ...toRefs(data), toast };
  },
  methods: {
    async handleCreate() {
      try {
        this.loading = true;
        const feedback = {
          texto: this.texto,
          denunciaId: this.denunciaId,
        };

        console.log(feedback);

        const response = await createFeedback(feedback);

        if (response.status === 201) {
          this.toast.success("Feedback enviado com sucesso!");
          this.closeModal();
        } else {
          this.toast.error("Erro ao enviar feedback");
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao enviar feedback, confira os campos!");
        console.log(error);
      }
    },
  },
};
</script>
