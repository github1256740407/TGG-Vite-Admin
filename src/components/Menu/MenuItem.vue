<script setup>
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});

const menuIcon = inject('menuIcon')
</script>

<template>
  <!-- 菜单页面 -->
  <el-menu-item v-if="!data.children?.length" :index="data.path">
    <el-icon v-show="data.meta.icon"><component :is="menuIcon[data.meta.icon]" /></el-icon>
    <span>{{ data.meta.title }}</span>
  </el-menu-item>
  <!-- 菜单目录 -->
  <el-sub-menu v-else :index="data.path">
    <template #title>
      <el-icon v-show="data.meta.icon"><component :is="menuIcon[data.meta.icon]" /></el-icon>
      <span>{{ data.meta.title }}</span>
    </template>
    <MenuItem v-for="item in data.children" :data="item" />
  </el-sub-menu>
</template>
