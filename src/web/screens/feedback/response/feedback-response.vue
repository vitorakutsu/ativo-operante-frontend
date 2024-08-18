<template>
  <div class="feedback-response-modal">
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="feedback-response-modal-content">
      <div class="feedback-response-modal-header">
        <div class="feedback-response-title-wrapper">
          <p class="feedback-response-title-bold">Feedback</p>
        </div>
        <p class="feedback-response-description">
          Aqui está um feedback sobre a denúncia realizada. Esperamos ter atendido o seu problema da melhor maneira possível
        </p>
      </div>
      <div class="feedback-response-divider" />
      <div class="feedback-response-content">
        <div class="feedback-response-row">
          <p class="feedback-response-text">{{ feedback.texto }}</p>
        </div>
      </div>
      <div class="feedback-response-divider" />
      <div class="feedback-response-button-wrapper">
        <FullButton label="Ok" color="#0095ff" :onPress="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import "./feedback-response.styles.css";
import FullButton from "@/components/full-button/full-button.vue";

export default {
  name: "FeedbackResponse",
  components: {
    FullButton,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    feedback: {
      type: Object,
      required: true,
    },
  },
};
</script>
