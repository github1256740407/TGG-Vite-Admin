<script setup>
const props = defineProps({
  name: {
    type: String,
  },
});
</script>

<template>
  <div id="PageMain">
    <!-- 标题栏顶部插槽 -->
    <div class="page-main-header">
      <span v-if="name" class="name">{{ name }}</span>
      <slot name="header" />
    </div>
    <!-- 分割线 -->
    <el-divider />
    <!-- 主题页面内容 -->
    <el-scrollbar>
      <div class="page-main-body">
        <slot />
      </div>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
#PageMain {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: var(--el-bg-color);
  .page-main-header {
    padding: 10px;
    .name {
      font-size: 22px;
    }
  }
  .el-divider {
    margin: 0;
  }
  .page-main-body {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
