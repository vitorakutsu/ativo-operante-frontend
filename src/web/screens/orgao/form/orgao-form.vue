<template>
  <div class="orgao-form-modal">
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="orgao-form-modal-content">
      <div class="orgao-form-modal-header">
        <div class="orgao-form-title-wrapper">
          <p class="orgao-form-title">Formulário de</p>
          <p class="orgao-form-title-bold">Orgãos</p>
        </div>
        <p class="orgao-form-description">
          Obrigado por escolher compartilhar suas preocupações conosco. Sua
          coragem em relatar questões importantes é fundamental para promover um
          ambiente seguro e justo para todos. Por favor, preencha o formulário
          abaixo com o máximo de detalhes possível. Todas as informações
          fornecidas serão tratadas com a mais alta confidencialidade.
        </p>
      </div>
      <div class="orgao-form-divider" />
      <div class="orgao-form-content">
        <div class="orgao-form-row">
          <Input
            label="Nome"
            placeholder="Digite o nome do orgão:"
            v-model="nome"
            required="true"
          />
        </div>
      </div>
      <div class="orgao-form-divider" />
      <div class="orgao-form-button-wrapper">
        <FullButton
          label="Cadastrar Orgão"
          color="#0095ff"
          :onPress="handleCreate"
        />
        <FullButton label="Cancelar" :onPress="closeModal" color="#ff0000" />
      </div>
    </div>
  </div>
</template>

<script>
import "./orgao-form.styles.css";
import Input from "@/components/input/input.vue";
import FullButton from "@/components/full-button/full-button.vue";
import { reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { createOrgao, updateOrgao } from ".";

export default {
  name: "OrgaoFormScreen",
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
      nome: "",
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
          const res = await updateOrgao(this.id, this.nome);
          this.loading = false;

          if (res.status === 200) {
            this.toast.success("Orgão atualizado com sucesso!");
            this.closeModal();
            this.nome = "";
          } else {
            this.toast.error("Erro ao atualizar orgão: " + res.statusText);
          }
        } catch (error) {
          this.loading = false;
          this.toast.error("Erro ao atualizar orgão: " + error.message);
        }
      } else {
        try {
          const res = await createOrgao(this.nome);
          this.loading = false;

          if (res.status === 201) {
            this.toast.success("Orgão criado com sucesso!");
            this.closeModal();
            this.nome = "";
          } else {
            this.toast.error("Erro ao criar orgão: " + res.statusText);
          }
        } catch (error) {
          this.loading = false;
          this.toast.error("Erro ao criar orgão: " + error.message);
        }
      }
    },
  },
};
</script>
