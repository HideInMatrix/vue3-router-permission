<template>
  <div>我是vip页面</div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave } from "vue-router";
onBeforeRouteLeave((to, from) => {
  // 在导航离开渲染该组件的对应路由时调用
  // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  console.log(to, from);
});
</script>
<style scoped lang="scss"></style>
