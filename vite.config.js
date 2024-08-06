// 基础引入
import path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
// 插件引入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// 三方组件库
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ command, mode }) => {
  // 当前环境下的所有自定义的VITE环境变量
  const CustomViteEnv = loadEnv(mode, process.cwd());
  return {
    base: '/TGG-Vite-Admin/',
    plugins: [
      vue(),
      AutoImport({
        // 自动导入相关函数, 例如: ref, reactive, toRefs...
        imports: ["vue", "vue-router", "pinia"],
        // 自动导入Element-plus相关函数, 例如: ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        // 自动注册Element-plus相关组件, 例如: el-button
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    json: {
      stringify: true, // JSON文件导入时, 会被自动解析成对象
    },
    server: {
      host: true, // 指定项目监听哪个IP, 如果['0.0.0.0'||true]将监听所有地址,包括局域网和公网
      port: CustomViteEnv.VITE_PORT,
      open: CustomViteEnv.VITE_OPEN,
    },
    build: {
      outDir: 'docs'
    }
  };
});
