<template>
  <div>我是admin页面</div>
  <!--  -->
  <button v-permission="['david']">david可以点</button>
  <button v-permission="['lisa']">lisa可以点</button>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss"></style>
