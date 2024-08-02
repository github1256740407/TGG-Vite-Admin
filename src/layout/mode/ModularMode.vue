<!-- 布局组件: 模块模式 -->
<script setup>
import { useThemeStore } from "@/store/useThemeStore/index.js";

const themeStore = useThemeStore();
const { VITE_PROJECT_NAME } = import.meta.env;
</script>

<template>
  <div id="ModularMode">
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
#ModularMode {
  box-sizing: border-box;
  padding: 10px 0;
  .el-aside {
    width: var(--custom-aside-width);
    height: 100%;
    transition: 0.15s;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
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
      margin: 0 10px;
      .common-function {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .el-main {
      margin: 10px 10px 0 10px;
      padding: 0;
    }
  }
}
</style>
