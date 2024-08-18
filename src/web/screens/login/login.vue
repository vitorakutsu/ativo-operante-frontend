<template>
  <div class="login-container">
    <div class="login-wrapper">
      <p class="welcome-text">Sistema de Denúncias "Ativo e Operante"</p>
      <div class="login-content">
        <Input label="Email" placeholder="Digite seu email:" v-model="email" />
        <Input label="Senha" placeholder="Digite sua senha:" v-model="senha" />
        <Button label="Login" color="#A32E37" :onPress="handleLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import "./login.styles.css";
import Input from "@/components/input/input.vue";
import Button from "@/components/button/button.vue";
import { login } from "./index";
import { reactive, toRefs } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  name: "LoginScreen",
  components: {
    Input,
    Button,
  },
  setup() {
    const router = useRouter();
    const toast = useToast();
    const data = reactive({
      email: "",
      senha: "",
    });

    async function checkToken() {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/home");
      }
    }

    checkToken();

    return { ...toRefs(data), toast };
  },
  methods: {
    async handleLogin() {
      try {
        const res = await login(this.email, this.senha);

        if (res.status === 200) {
          this.toast.success("Login efetuado com sucesso!");
          this.$router.push("/home");
        } else {
          this.toast.error("Crendenciais inválidas");
        }
      } catch (error) {
        this.toast.error("Crendenciais inválidas");
        console.error(error.message);
      }
    },
  },
};
</script>
