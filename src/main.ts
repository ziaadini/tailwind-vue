import { createApp } from "vue";
import App from "./App.vue";
import "./assets/css/index.css";
import router from "./router";
import VueMarkdownIt from "vue3-markdown-it";

createApp(App)
  .use(router)
  .use(VueMarkdownIt)
  .mount("#app");
