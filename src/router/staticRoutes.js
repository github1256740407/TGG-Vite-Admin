export default [
  // 根路径
  {
    path: "/",
    redirect: { name: "Layout" },
  },
  // 登录页
  {
    name: "Login",
    path: "/Login",
    component: () => import("@/views/Login/index.vue"),
  },
  // 布局容器页
  {
    name: "Layout",
    path: "/Layout",
    component: () => import("@/layout/index.vue"),
  },
  // 通配符* 404页面
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/layout/404.vue"),
  },
];
