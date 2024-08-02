import { createWebHashHistory, createRouter } from "vue-router";
import progressLoad from "@/utils/progressLoad.js";
import { useUserStore } from "@/store/useUserStore";
import { useRouteStore } from "@/store/useRouteStore";
import staticRoutes from "./staticRoutes.js";
import { getRoutes } from "@/api/modules/base.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

// 页面组件
const componentModules = import.meta.glob("@/views/**");
// 动态添加路由
const handleAddRoutes = async () => {
  // 获取动态路由
  const routeStore = useRouteStore();
  const { body } = await getRoutes();
  routeStore.data = body;
  const { routeData } = routeStore;
  // 添加动态路由
  for (let index = 0; index < routeData.length; index++) {
    const routeItem = routeData[index];
    router.addRoute("Layout", {
      ...routeItem,
      component: componentModules[`/src/views/${routeItem.component}/index.vue`]
    });
  }
  // 拿到layout容器路由, 并将其redirect定向成动态路由的第一条
  const layoutRoute = router.getRoutes().find((item) => item.name === "Layout");
  layoutRoute.redirect = { name: routeData[0].name }
  console.log("%c[Vue3-Router]: 动态路由已添加完成", "color: green", router.getRoutes());
};

// 路由全局前置守卫
router.beforeEach(async (to) => {
  progressLoad.startLoad();
  const userStore = useUserStore(); // 用户信息库
  const routeStore = useRouteStore(); // 动态路由库
  // 1. 未登录 && 准备前往非登录页 => 前往登录页面
  if (!userStore.token && to.fullPath !== "/Login") return "/Login";
  // 2. 登录 && 准备前往非登录页 => 添加动态路由
  if (userStore.token && !routeStore.data.length) {
    await handleAddRoutes();
    return to.fullPath;
  }
  return true;
});

// 路由全局后置守卫
router.afterEach(() => {
  progressLoad.endLoad();
});

export default router;
