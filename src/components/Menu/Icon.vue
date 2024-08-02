<script setup>
const props = defineProps({
  icon: {
    type: String,
    require: true,
  },
});
</script>

<template>
  <el-icon id="Icon">
    <svg aria-hidden="true"><use :xlink:href="`#${icon}`"></use></svg>
  </el-icon>
</template>

<style lang="scss" scoped>
#Icon{
  width: 22px;
  height: 22px;
}
</style>
