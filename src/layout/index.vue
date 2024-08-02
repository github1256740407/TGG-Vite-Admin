<script setup>
import MixMode from "@/layout/mode/MixMode.vue";
import LeftMode from "@/layout/mode/LeftMode.vue";
import TopMode from "@/layout/mode/TopMode.vue";
import ModularMode from "@/layout/mode/ModularMode.vue";
import { useThemeStore } from "@/store/useThemeStore";

const themeStore = useThemeStore();

const layoutMode = computed(() => {
  switch (themeStore.layoutMode) {
    case "MixMode":
      return MixMode;
    case "LeftMode":
      return LeftMode;
    case "TopMode":
      return TopMode;
    case "ModularMode":
      return ModularMode;
  }
});
</script>

<template>
  <Transition name="transition" mode="out-in">
    <component class="component" :is="layoutMode" />
  </Transition>
</template>

<style lang="scss" scoped>
.component {
  width: 100vw;
  height: 100vh;
  background-color: var(--el-bg-color-page);
  :deep(.el-header) {
    background-color: var(--el-bg-color);
  }
  :deep(.el-aside) {
    background-color: var(--el-bg-color);
  }
  :deep(.el-main) {
    padding: 16px;
    // background-color: var(--el-bg-color);
  }
}

// 展示周期: 动画效果
.transition-enter-active,
.transition-leave-active {
  transition: all 0.2s ease-in-out;
}
// 进入的动画初始样式
.transition-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
// 离开的动画初始样式
.transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
