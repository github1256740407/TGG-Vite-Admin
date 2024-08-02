<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>

<template>
  <!-- element-plus中文化 -->
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
