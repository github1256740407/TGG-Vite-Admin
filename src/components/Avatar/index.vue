<script setup>
import { useUserStore } from "@/store/useUserStore";
import { ArrowDown } from "@element-plus/icons-vue";

const userStore = useUserStore();
</script>

<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="userStore.logOut">退出登录</el-dropdown-item>
        <el-dropdown-item disabled>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown {
  margin-left: 20px;
  cursor: pointer;
}
.example-showcase {
  .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
  }
}
</style>
