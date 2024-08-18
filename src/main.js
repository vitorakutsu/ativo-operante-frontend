import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; // Importa os estilos padrão do Toast

library.add(fas);

const app = createApp(App);

// Registra o componente FontAwesomeIcon globalmente
// eslint-disable-next-line vue/multi-word-component-names
app.component("fa", FontAwesomeIcon);

// Utiliza o vue-router
app.use(router);

// Adiciona o plugin Toast com algumas opções padrão (ajuste conforme necessário)
app.use(Toast, {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: "button",
  icon: true,
  rtl: false,
});

// Monta a aplicação Vue
app.mount("#app");
