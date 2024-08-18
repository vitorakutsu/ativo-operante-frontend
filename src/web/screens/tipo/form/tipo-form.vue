<template>
  <div class="tipo-form-modal">
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="tipo-form-modal-content">
      <div class="tipo-form-modal-header">
        <div class="tipo-form-title-wrapper">
          <p class="tipo-form-title">Formulário de</p>
          <p class="tipo-form-title-bold">Tipos</p>
        </div>
        <p class="tipo-form-description">
          Obrigado por escolher compartilhar suas preocupações conosco. Sua
          coragem em relatar questões importantes é fundamental para promover um
          ambiente seguro e justo para todos. Por favor, preencha o formulário
          abaixo com o máximo de detalhes possível. Todas as informações
          fornecidas serão tratadas com a mais alta confidencialidade.
        </p>
      </div>
      <div class="tipo-form-divider" />
      <div class="tipo-form-content">
        <div class="tipo-form-row">
          <Input
            label="Nome"
            placeholder="Digite o nome do tipo de denúncia:"
            v-model="nome"
            required="true"
          />
        </div>
      </div>
      <div class="tipo-form-divider" />
      <div class="tipo-form-button-wrapper">
        <FullButton
          label="Cadastrar Tipo"
          color="#0095ff"
          :onPress="handleCreate"
        />
        <FullButton label="Cancelar" :onPress="closeModal" color="#ff0000" />
      </div>
    </div>
  </div>
</template>

<script>
import "./tipo-form.styles.css";
import Input from "@/components/input/input.vue";
import FullButton from "@/components/full-button/full-button.vue";
import { reactive, toRefs } from "vue";
import { createType, updateType } from "./index";
import { useToast } from "vue-toastification";

export default {
  name: "TypeFormScreen",
  components: {
    Input,
    FullButton,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
    id: {
      type: String,
      default: "",
    },
  },
  setup() {
    const data = reactive({
      loading: false,
    });
    const toast = useToast();
    return { ...toRefs(data), toast };
  },
  methods: {
    async handleCreate() {
      this.loading = true;
      if (this.id) {
        try {
          const res = await updateType(this.id, this.nome);
          this.loading = false;

          if (res.status === 200) {
            this.toast.success("Tipo de denúncia atualizado com sucesso!");
            this.closeModal();
          } else {
            this.toast.error("Erro ao atualizar tipo de denúncia");
          }
        } catch (error) {
          console.log(error);
          this.loading = false;
          this.toast.error("Erro ao atualizar tipo de denúncia");
        }
      } else {
        try {
          const res = await createType(this.nome);
          this.loading = false;

          if (res.status === 201) {
            this.toast.success("Tipo de denúncia criado com sucesso!");
            this.closeModal();
          } else {
            this.toast.error("Erro ao criar tipo de denúncia");
          }
        } catch (error) {
          this.loading = false;
          this.toast.error("Erro ao criar tipo de denúncia");
        }
      }
    },
  },
};
</script>
