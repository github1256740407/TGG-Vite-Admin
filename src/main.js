// 基础引入
import { createApp } from "vue";
import App from "./App.vue";
// 样式引入
import "@/assets/style/reset.css";
import "@/assets/style/theme.css";
import "@/assets/style/pageLoad.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// 菜单图标
import "@/assets/icons";
// 缓冲动画
import refreshPageLoad from "@/utils/refreshPageLoad.js";
// 插件引入
import router from "@/router/index.js";
import pinia from "@/store/index.js";
// 异常捕获
import catchWebError from "@/utils/catchWebError.js";

// ----------初始化: 前端异常日志捕获 + 上报----------
catchWebError.init("TGG-Vite", import.meta.env.VITE_API_BASE_URL);

// ----------初始化: 页面刷新的缓冲动画效果----------
refreshPageLoad.init();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
