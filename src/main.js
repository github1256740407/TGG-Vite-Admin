// 基础引入
import { createApp } from "vue";
import App from "./App.vue";
// 样式引入
import "@/assets/style/reset.css";
import "@/assets/style/theme.css";
import "@/assets/style/pageLoad.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// 插件引入
import router from "@/router/index.js";
import pinia from "@/store/index.js";
// 页面刷新动画
import pageLoad from "@/utils/pageLoad.js";
// 异常捕获
import catchError from "@/utils/catchError.js";

// ----------初始化: 前端异常日志捕获 + 上报----------
catchError.init("TGG-Vite", import.meta.env.VITE_API_BASE_URL);

// ----------初始化: 页面刷新的缓冲动画效果----------
pageLoad.init();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount("#app");
