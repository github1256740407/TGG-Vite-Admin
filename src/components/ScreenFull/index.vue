<script setup>
import { FullScreen } from "@element-plus/icons-vue";

const isFullScreen = ref(false);

watch(
  () => isFullScreen.value,
  (newValue) => {
    if (newValue) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
);
</script>

<template>
  <!-- 全屏 -->
  <el-icon id="FullScreen" size="22" @click="() => (isFullScreen = !isFullScreen)"><FullScreen /></el-icon>
</template>

<style lang="scss" scoped>
#FullScreen {
  cursor: pointer;
  margin-left: 20px;
}
</style>
