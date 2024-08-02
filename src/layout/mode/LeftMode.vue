<!-- 布局组件: 左栏模式 -->
<script setup>
import { useThemeStore } from "@/store/useThemeStore/index.js";

const themeStore = useThemeStore();
const { VITE_PROJECT_NAME } = import.meta.env;
</script>

<template>
  <div id="LeftMode">
    <el-container>
      <!-- 菜单 -->
      <el-aside>
        <div class="logo">
          <span v-show="!themeStore.collapse">{{ VITE_PROJECT_NAME }}</span>
        </div>
        <el-scrollbar>
          <Menu />
        </el-scrollbar>
      </el-aside>
      <!-- 主体 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="common-function">
            <!-- 日夜间切换 -->
            <ThemeSwitch />
            <!-- 全屏放大 -->
            <ScreenFull />
            <!-- 用户账号 -->
            <Avatar />
            <!-- 设置 -->
            <Setting />
          </div>
        </el-header>
        <!-- 页面 -->
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
#LeftMode {
  .el-aside {
    width: var(--custom-aside-width);
    height: 100%;
    transition: 0.15s;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-right: 1px solid var(--el-border-color);
    .logo {
      font-size: 18px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
      padding-left: 20px;
      overflow: hidden;
    }
  }
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      height: 60px;
      display: flex;
      box-sizing: border-box;
      border-bottom: 1px solid var(--el-border-color);
      .common-function {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
