<script setup>
import Icon from "./Icon.vue"
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
</script>

<template>
  <!-- 菜单页面 -->
  <el-menu-item v-if="!data.children?.length" :index="data.path">
    <Icon icon="icon-database"/>
    <span>{{ data.meta.title }}</span>
  </el-menu-item>
  <!-- 菜单目录 -->
  <el-sub-menu v-else :index="data.path">
    <template #title>
      <Icon icon="icon-database"/>
      <span>{{ data.meta.title }}</span>
    </template>
    <MenuItem v-for="item in data.children" :data="item" />
  </el-sub-menu>
</template>