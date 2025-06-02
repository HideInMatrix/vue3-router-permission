<template>
  <div class="block">
    <i v-html="content"></i>
  </div>
</template>

<script setup lang="ts">

defineProps({

  content:{
    type:String,
    default: ""
  }
})


</script>