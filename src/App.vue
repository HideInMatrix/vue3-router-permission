<template>
  <router-view v-slot="{ Component,route  }">
    <keep-alive :include="include" :exclude="excludes">
      <transition name="fade-slide" mode="out-in">
        <component :is="Component" :key="route.path" class="w-screen h-screen"/>
      </transition>
    </keep-alive>
  </router-view>
</template>
<script setup lang="ts">
import api from "@/api/customAxios"
import { excludes } from '@/router/keepAlive'



const include = ['A', 'C']




// api.get(
//   `https://onlineservice-api.zhihuishu.com/gateway/t/v1/teacher/index2/queryLastSelectIdentity`,
//   { recruitId: 1234, userId: 5678 },
//   (resp: any) => {
//     console.log(resp);

//   },
//   (error: any) => {
//     console.log(error);

//   })

api.post("https://onlineservice-api.zhihuishu.com/gateway/t/v1/student/queryStudentAICourseList", {
  "userId": 1234,
  "courseId": 5678,
  "type": 1,
}, (resp: any) => {
  console.log('post success', resp);

}, (error: any) => {
  console.log('post error', error);
})
</script>

<style scoped>
/* 过渡动画：左右滑动并且淡入淡出 */

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: transform 1s ease, opacity 1s ease;
}

/* 进入动画：从右侧进入 */
.fade-slide-enter {
  transform: translateX(100%);
  opacity: 0;
}

/* 离开动画：从左侧离开 */
.fade-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
