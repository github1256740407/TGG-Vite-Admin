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
</script>

<template>
  <el-menu
    id="Menu"
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
</style>
