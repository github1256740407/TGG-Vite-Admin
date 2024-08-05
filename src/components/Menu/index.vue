<script setup>
import { useRouteStore } from "@/store/useRouteStore/index.js";
import { useThemeStore } from "@/store/useThemeStore/index.js";
import MenuItem from "./MenuItem.vue";

const route = useRoute();

const routeStore = useRouteStore();
const themeStore = useThemeStore();

const props = defineProps({
  mode: {
    type: String,
    default: "vertical", // 竖着的菜单
  },
});

const menuIcon = reactive({});

onMounted(() => {
  // 按需 + 动态引入icon组件
  registerIcon(routeStore.menuData);
});

// 按需+动态注册Element-plus的icon
const registerIcon = (data) => {
  data.forEach((item) => {
    if (item.meta.icon) {
      import(`@element-plus/icons-vue`).then((res) => {
        menuIcon[item.meta.icon] = shallowRef(res[item.meta.icon]);
      });
    }
    if (item.children instanceof Array && item.children.length > 0) {
      registerIcon(item.children);
    }
  });
};

provide("menuIcon", menuIcon);
</script>

<template>
  <el-menu
    id="Menu"
    :class="themeStore.lightParentMenu ? 'lightParentMenu' : ''"
    router
    :mode="mode"
    :default-active="route.fullPath"
    :collapse="mode === 'vertical' ? themeStore.collapse : false"
    :collapse-transition="false"
  >
    <MenuItem v-for="item in routeStore.menuData" :data="item" />
  </el-menu>
</template>

<style lang="scss" scoped>
#Menu {
  width: 100%;
  height: 100%;
  border-right: none;
}
.lightParentMenu {
  // 高亮当前菜单项关联的所有父菜单title
  :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-bg-color) !important;
  }
}
</style>
