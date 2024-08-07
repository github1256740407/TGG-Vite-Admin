<script setup>
import { nodeTest } from "@/api/modules/base.js";

const handleNodeTest = () => {
  nodeTest();
};
</script>

<template>
  <PageMain name="Node接口">
    <el-button @click="handleNodeTest">Node服务器测试接口</el-button>
  </PageMain>
</template>

<style lang="scss" scoped></style>
