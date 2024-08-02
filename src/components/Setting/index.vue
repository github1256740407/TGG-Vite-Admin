<script setup>
import { Setting, QuestionFilled } from "@element-plus/icons-vue";
import { useThemeStore } from "@/store/useThemeStore/index.js";

const themeStore = useThemeStore();
const settingVisible = ref(false);

// 点击切换布局
const handleLayoutMode = (layout) => {
  themeStore.layoutMode = layout;
};
// 恢复默认
const handleResetDefault = () => {
  themeStore.$reset();
  window.location.reload();
};

// 监控: 菜单是否收缩 => 修改 --custom-aside-width
watch(
  () => themeStore.collapse,
  (value) => {
    if (value) {
      document.documentElement.style.setProperty("--custom-aside-width", "66px");
    } else {
      document.documentElement.style.setProperty("--custom-aside-width", "200px");
    }
  },
  { immediate: true }
);
</script>

<template>
  <!-- 设置 -->
  <el-icon id="Setting" size="22" @click="() => (settingVisible = true)"><Setting /></el-icon>
  <!-- 抽屉弹窗: 具体设置项 -->
  <el-drawer v-model="settingVisible" title="布局配置" :size="320">
    <div class="setting-box">
      <!-- 布局配置 -->
      <div class="title">
        <span>布局配置</span>
      </div>
      <div class="layout-mode-config">
        <!-- 经典模式 -->
        <div
          :class="themeStore.layoutMode === 'MixMode' ? 'mix-mode mode active' : 'mix-mode mode'"
          @click="handleLayoutMode('MixMode')"
        >
          <div class="top" />
          <div class="left" />
          <div class="cycle">经典模式</div>
        </div>
        <!-- 左栏模式 -->
        <div
          :class="themeStore.layoutMode === 'LeftMode' ? 'left-mode mode active' : 'left-mode mode'"
          @click="handleLayoutMode('LeftMode')"
        >
          <div class="top" />
          <div class="left" />
          <div class="cycle">左栏模式</div>
        </div>
        <!-- 顶栏模式 -->
        <div
          :class="themeStore.layoutMode === 'TopMode' ? 'top-mode mode active' : 'top-mode mode'"
          @click="handleLayoutMode('TopMode')"
        >
          <div class="top" />
          <div class="cycle">顶栏模式</div>
        </div>
        <!-- 模块模式 -->
        <div
          :class="themeStore.layoutMode === 'ModularMode' ? 'modular-mode mode active' : 'modular-mode mode'"
          @click="handleLayoutMode('ModularMode')"
        >
          <div class="top" />
          <div class="left" />
          <div class="container" />
          <div class="cycle">模块模式</div>
        </div>
      </div>
      <!-- 效果配置 -->
      <div class="title">
        <span>效果配置</span>
      </div>
      <div class="effect-config">
        <div class="config">
          <span>暗黑模式:</span>
          <ThemeSwitch />
        </div>
        <div class="config">
          <span>菜单是否收缩:</span>
          <el-switch v-model="themeStore.collapse" :active-value="true" :inactive-value="false" />
          <el-tooltip content="该配置在[顶栏模式]下不生效" placement="top-start">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </div>
      <!-- 恢复默认 -->
      <el-button class="reset" @click="handleResetDefault">恢复默认</el-button>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped>
#Setting {
  cursor: pointer;
  margin-left: 20px;
}
.setting-box {
  font-size: 14px;
  .title {
    width: 100%;
    height: 1px;
    border-top: 1px var(--el-border-color) dashed;
    display: block;
    margin-bottom: 24px;
    position: relative;
    span {
      font-weight: 500;
      color: var(--el-text-color-primary);
      background-color: var(--el-bg-color-page);
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  }
  .layout-mode-config {
    display: grid;
    grid-template-rows: 120px 120px;
    grid-template-columns: 50% 50%;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    margin-bottom: 24px;
    .mode {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px var(--el-border-color) solid;
      box-sizing: border-box;
      position: relative;
      background-color: var(--el-border-color-extra-light);
      outline: 1px solid transparent;
      transition: 0.4s;
      cursor: pointer;
      &:hover {
        outline: 1px solid var(--el-color-primary);
      }
      .cycle {
        width: 60px;
        height: 60px;
        line-height: 60px;
        padding: 4px;
        font-size: 12px;
        position: absolute;
        text-align: center;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        border: 1px solid var(--el-color-primary);
      }
    }
    .mix-mode {
      .top {
        background-color: var(--el-border-color);
        width: 100%;
        height: 18px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
      .left {
        background-color: var(--el-border-color-lighter);
        width: 18px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
    .left-mode {
      .top {
        background-color: var(--el-border-color);
        width: 100%;
        height: 18px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
      .left {
        background-color: var(--el-border-color-lighter);
        width: 18px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
    }
    .top-mode {
      .top {
        background-color: var(--el-border-color);
        width: 100%;
        height: 18px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
      }
    }
    .modular-mode {
      padding: 2px;
      background-color: transparent;
      .top {
        background-color: var(--el-border-color);
        width: calc(100% - 34px);
        height: 18px;
        position: absolute;
        right: 6px;
        top: 4px;
        z-index: 1;
      }
      .left {
        background-color: var(--el-border-color-lighter);
        width: 18px;
        height: calc(100% - 8px);
        position: absolute;
        left: 4px;
        bottom: 4px;
        z-index: 0;
      }
      .container {
        background-color: var(--el-border-color-extra-light);
        width: calc(100% - 34px);
        height: calc(100% - 32px);
        position: absolute;
        right: 6px;
        bottom: 4px;
        z-index: 0;
      }
    }
    // 当前激活模块
    .active {
      outline: 1px solid var(--el-color-primary);
    }
  }
  .effect-config {
    .config {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        margin-right: 10px;
      }
      .el-icon {
        font-size: 20px;
        margin-left: 10px;
      }
    }
  }
}
.reset {
  width: 100%;
  margin-top: 24px;
}
</style>
