<template>
  <div class="usuario-form-modal">
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="usuario-form-modal-content">
      <div class="usuario-form-modal-header">
        <div class="usuario-form-title-wrapper">
          <p class="usuario-form-title">Formulário de</p>
          <p class="usuario-form-title-bold">Orgãos</p>
        </div>
        <p class="usuario-form-description">
          Obrigado por escolher compartilhar suas preocupações conosco. Sua
          coragem em relatar questões importantes é fundamental para promover um
          ambiente seguro e justo para todos. Por favor, preencha o formulário
          abaixo com o máximo de detalhes possível. Todas as informações
          fornecidas serão tratadas com a mais alta confidencialidade.
        </p>
      </div>
      <div class="usuario-form-divider" />
      <div class="usuario-form-content">
        <div class="usuario-form-row">
          <Input
            label="Email"
            placeholder="Digite o email do Usuário:"
            v-model="email"
            required="true"
          />
        </div>
        <div class="usuario-form-row">
          <Input
            label="CPF"
            placeholder="Digite um CPF:"
            v-model="cpf"
            required="true"
            :maxLength="11"
          />
          <Input
            label="Senha"
            placeholder="Digite uma senha:"
            v-model="senha"
            required="true"
          />
        </div>
        <div class="usuario-form-row">
          <Select
            label="Tipo de Usuário"
            :options="usuarioOptions"
            v-model="nivel"
            required="true"
          />
        </div>
      </div>
      <div class="usuario-form-divider" />
      <div class="usuario-form-button-wrapper">
        <FullButton
          label="Cadastrar Usuário"
          color="#0095ff"
          :onPress="handleCreate"
        />
        <FullButton label="Cancelar" :onPress="closeModal" color="#ff0000" />
      </div>
    </div>
  </div>
</template>

<script>
import "./usuario-form.styles.css";
import Select from "@/components/select/select.vue";
import FullButton from "@/components/full-button/full-button.vue";
import Input from "@/components/input/input.vue";
import { reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { createUsuario } from "./index";

export default {
  name: "TypeFormScreen",
  components: {
    Input,
    FullButton,
    Select,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const data = reactive({
      cpf: "",
      email: "",
      senha: "",
      nivel: "",
      loading: false,
    });
    const toast = useToast();
    return { ...toRefs(data), toast };
  },
  methods: {
    async handleCreate() {
      this.loading = true;
      try {
        const usuario = {
          email: this.email,
          cpf: this.cpf,
          senha: Number(this.senha),
          nivel: Number(this.nivel),
        };

        const res = await createUsuario(usuario);
        this.loading = false;

        if (res.status === 201) {
          this.toast.success("Usuário criado com sucesso!");
          this.nome = "";
          this.closeModal();
        } else {
          this.toast.error("Erro ao criar usuário");
        }
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao criar usuário");
      }
    },
  },
  data() {
    return {
      usuarioOptions: [
        {
          id: 1,
          nome: "Administrador",
        },
        {
          id: 2,
          nome: "Membro Comum",
        },
      ],
    };
  },
};
</script>
