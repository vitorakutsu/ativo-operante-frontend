<template>
  <Screen>
    <UsuarioForm :closeModal="closeModal" v-if="showModal" />
    <div v-if="loading" class="loading">Carregando...</div>
    <div class="usuario-list-header">
      <div class="usuario-list-header-title-wrapper">
        <p class="usuario-list-header-title">
          Bem-vindo à Seção de Cadastro de
        </p>
        <p class="usuario-list-header-title-bold">Usuários</p>
      </div>
      <p class="usuario-list-header-description">
        Aqui, você pode revisar os nomes dos usuários existentes antes de
        decidir se deseja criar sua própria conta. Se você ainda não tem uma
        conta, pode preencher o formulário de registro abaixo para se juntar à
        comunidade e contribuir para um ambiente mais seguro e justo.
      </p>
      <Button
        label="Cadastrar"
        color="#0095ff"
        style="margin: 24px 0 0"
        :onPress="toggleModal"
      />
    </div>
    <div class="usuario-list-container">
      <div v-for="(usuarios, letter, index) in groupedUsuarios" :key="index">
        <p class="usuario-list-label">{{ letter }}</p>
        <div class="usuario-list-row">
          <div
            v-for="usuario in usuarios"
            :key="usuario.id"
            class="usuario-list-item"
          >
            <div class="usuario-list-item-wrapper">
              <fa icon="fa-user" />
              <p class="usuario-list-item-title">{{ usuario.email }}</p>
            </div>
            <div class="usuario-list-header-mode">
              <fa
                class="usuario-list-icon"
                @click="deleteUsuario(usuario.id)"
                icon="fa-trash-can"
                style="color: #ff0000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Screen>
</template>

<script>
import "./usuario-list.styles.css";
import Button from "@/components/button/button.vue";
import Screen from "@/components/screen/screen.vue";
import UsuarioForm from "../form/usuario-form.vue";
import { computed, reactive, ref, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { getAllUsuario, deleteUsuario } from "./index";

export default {
  name: "TipoListScreen",
  components: {
    Button,
    Screen,
    UsuarioForm,
  },
  data() {
    return {
      showModal: false,
    };
  },
  setup() {
    const data = reactive({
      loading: false,
    });
    const usuariosOptions = ref([]);
    const toast = useToast();

    const groupedUsuarios = computed(() => {
      const groups = {};

      usuariosOptions.value.forEach((tipo) => {
        const email = tipo.email[0].toUpperCase();
        if (!groups[email]) {
          groups[email] = [];
        }
        groups[email].push(tipo);
      });

      const sortedTipos = Object.keys(groups).sort();
      const sortedGroups = {};
      sortedTipos.forEach((email) => {
        sortedGroups[email] = groups[email];
      });

      return sortedGroups;
    });

    async function fetchUsuarios() {
      try {
        const res = await getAllUsuario();
        if (res.status === 200) {
          usuariosOptions.value = res.data;
        } else {
          console.error("Erro ao obter os usuários");
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchUsuarios();

    return { ...toRefs(data), toast, groupedUsuarios, fetchUsuarios };
  },
  methods: {
    async deleteUsuario(usuarioId) {
      try {
        this.loading = true;
        const res = await deleteUsuario(usuarioId);
        if (res.status === 200) {
          this.loading = false;
          this.toast.success("Usuário deletado com sucesso");
          this.fetchUsuarios();
        } else {
          this.loading = false;
          this.toast.error("Erro ao deletar o Usuário");
        }
      } catch (error) {
        this.loading = false;
        this.toast.error("Erro ao deletar o Usuário");
      }
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    async closeModal() {
      this.showModal = false;
      await this.fetchUsuarios();
    },
  },
};
</script>
