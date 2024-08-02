<script setup>
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useThemeStore, initThemeStyle } from "@/store/useThemeStore/index.js";

const themeStore = useThemeStore();

const handleClickSwitch = ({ clientX, clientY }) => {
  // 初始化主题样式
  const transition = initThemeStyle(themeStore.theme);
  // 缩放扩散动画效果
  transition.ready.then(() => {
    const endRadius = Math.hypot(
      Math.max(clientX, window.innerWidth - clientX),
      Math.max(clientY, window.innerHeight - clientY)
    );
    // 动画效果路径
    const clipPath = [
      `circle(0px at ${clientX}px ${clientY}px)`,
      `circle(${endRadius}px at ${clientX}px ${clientY}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: themeStore.theme === "dark" ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 600,
        easing: "ease-in",
        pseudoElement: themeStore.theme === "dark" ? "::view-transition-new(root)" : "::view-transition-old(root)",
      }
    );
  });
};
</script>

<template>
  <!-- 日夜间切换 -->
  <el-switch
    id="ThemeSwitch"
    v-model="themeStore.theme"
    active-value="dark"
    inactive-value="auto"
    @click="handleClickSwitch"
  >
    <template #active-action>
      <el-icon><Moon /></el-icon>
    </template>
    <template #inactive-action>
      <el-icon><Sunny /></el-icon>
    </template>
  </el-switch>
</template>
