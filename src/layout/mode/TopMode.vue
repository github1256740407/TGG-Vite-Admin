<!-- 布局组件: 混合模式 -->
<script setup>
const { VITE_PROJECT_NAME } = import.meta.env;
</script>

<template>
  <div id="TopMode">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="logo">
          <span>{{ VITE_PROJECT_NAME }}</span>
        </div>
        <div class="menu">
          <Menu mode="horizontal" />
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
        <!-- 页面 -->
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
#TopMode {
  .el-header {
    height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      font-size: 18px;
      font-weight: bold;
      height: 60px;
      line-height: 60px;
    }
    .menu {
      flex: 1;
      margin-left: 20px;
      overflow: hidden;
    }
    .common-function {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .el-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
