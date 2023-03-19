import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./sass/theme.scss";
import "./icon/iconfont.css"

window.document.documentElement.setAttribute("data-theme", "light");

createApp(App).mount("#app");
