<!-- 布局组件: 经典模式 -->
<script setup>
const { VITE_PROJECT_NAME } = import.meta.env;
</script>

<template>
  <div id="MixMode">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="logo">
          <span>{{ VITE_PROJECT_NAME }}</span>
        </div>
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
      <!-- 主体 -->
      <el-container>
        <!-- 菜单 -->
        <el-aside>
          <el-scrollbar>
            <Menu />
          </el-scrollbar>
        </el-aside>
        <!-- 页面 -->
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
#MixMode {
  .el-header {
    height: 60px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid var(--el-border-color);
    .logo {
      font-size: 18px;
      font-weight: bold;
      margin-right: auto;
    }
    .common-function {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .el-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .el-aside {
      width: var(--custom-aside-width);
      height: 100%;
      transition: 0.15s;
      border-right: 1px solid var(--el-border-color);
    }
  }
}
</style>
