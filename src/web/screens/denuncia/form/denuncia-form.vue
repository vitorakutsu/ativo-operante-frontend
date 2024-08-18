<template>
  <div class="denuncia-form-modal">
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="denuncia-form-modal-content">
      <div class="denuncia-form-modal-header">
        <div class="denuncia-form-title-wrapper">
          <p class="denuncia-form-title">Formulário de</p>
          <p class="denuncia-form-title-bold">Denúncias</p>
        </div>
        <p class="denuncia-form-description">
          Obrigado por escolher compartilhar suas preocupações conosco. Sua
          coragem em relatar questões importantes é fundamental para promover um
          ambiente seguro e justo para todos. Por favor, preencha o formulário
          abaixo com o máximo de detalhes possível. Todas as informações
          fornecidas serão tratadas com a mais alta confidencialidade.
        </p>
      </div>
      <div class="denuncia-form-divider" />
      <div class="denuncia-form-content">
        <div class="denuncia-form-row">
          <Input
            label="Título"
            placeholder="Digite um título para sua denúncia:"
            v-model="titulo"
            required="true"
          />
        </div>
        <div class="denuncia-form-row">
          <TextArea
            label="Descrição"
            placeholder="Digite uma descrição para sua denúncia:"
            v-model="texto"
            required="true"
          />
        </div>
        <div class="denuncia-form-row">
          <Select
            label="Urgência"
            :options="urgenciaOptions"
            v-model="urgencia"
            required="true"
          />
          <Select
            label="Orgão"
            :options="orgaoOptions"
            v-model="orgao"
            required="true"
          />
        </div>
        <div class="denuncia-form-row">
          <DatePicker
            label="Data"
            placeholder="Selecione uma data"
            v-model="data"
            required="true"
          />
          <Select
            label="Tipo da Denúncia"
            :options="tipoOptions"
            v-model="tipo"
            required="true"
          />
        </div>
      </div>
      <div class="denuncia-form-divider" />
      <div class="denuncia-form-button-wrapper">
        <FullButton
          label="Enviar Denúncia"
          color="#0095ff"
          :onPress="onSubmit"
        />
        <FullButton label="Cancelar" :onPress="closeModal" color="#ff0000" />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/date-picker/date-picker.vue";
import FullButton from "@/components/full-button/full-button.vue";
import Input from "@/components/input/input.vue";
import Select from "@/components/select/select.vue";
import TextArea from "@/components/text-area/text-area.vue";
import { reactive, ref, toRefs } from "vue";
import "./denuncia-form.styles.css";
import { getAllOrgao, getAllTipo, createDenuncia } from "./index";
import { useToast } from "vue-toastification";

export default {
  name: "ReportFormScreen",
  components: {
    Input,
    TextArea,
    Select,
    DatePicker,
    FullButton,
  },
  props: {
    closeModal: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const toast = useToast();
    const orgaoOptions = ref([]);
    const tipoOptions = ref([]);
    const data = reactive({
      titulo: "",
      texto: "",
      urgencia: "",
      orgao: "",
      data: "",
      tipo: "",
      loading: false,
    });

    async function fetchOrgao() {
      try {
        const res = await getAllOrgao();
        if (res.status === 200) {
          orgaoOptions.value = res.data;
        } else {
          console.error("Erro ao obter as denúncias");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchTipo() {
      try {
        const res = await getAllTipo();
        if (res.status === 200) {
          tipoOptions.value = res.data;
        } else {
          console.error("Erro ao obter as denúncias");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchOrgao();
    fetchTipo();

    return { orgaoOptions, tipoOptions, ...toRefs(data), toast };
  },
  methods: {
    async onSubmit() {
      try {
        this.loading = true;
        const denuncia = {
          titulo: this.titulo,
          texto: this.texto,
          urgencia: Number(this.urgencia),
          orgao: Number(this.orgao),
          data: new Date(this.data).toISOString(),
          tipo: Number(this.tipo),
        };

        const response = await createDenuncia(denuncia);

        if (response.status === 201) {
          this.toast.success("Denúncia criada com sucesso!");
          this.closeModal();
        } else {
          this.toast.error("Erro ao criar a denúncia");
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao criar a denúncia, confira os campos!");
        console.log(error);
      }
    },
  },
  data() {
    return {
      urgenciaOptions: [
        {
          id: 1,
          nome: "Urgência muito baixa",
        },
        {
          id: 2,
          nome: "Urgência baixa",
        },
        {
          id: 3,
          nome: "Urgência média",
        },
        {
          id: 4,
          nome: "Urgência alta",
        },
        {
          id: 5,
          nome: "Urgência muito alta",
        },
      ],
    };
  },
};
</script>
