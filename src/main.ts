import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./sass/theme.scss";

window.document.documentElement.setAttribute("data-theme", "light");

createApp(App).mount("#app");
