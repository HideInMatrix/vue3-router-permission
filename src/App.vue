<template>
  <div>
    <span>切换身份:</span>
    <button @click="changeRoleFn('user')">user</button>
    <button @click="changeRoleFn('custom')">custom</button>
    <button @click="changeRoleFn('admin')">admin</button>
  </div>
  <div>
    <span>跳转路由</span>
    <button
      @click="
        () => {
          router.push('/user');
        }
      ">
      user
    </button>
    <button
      @click="
        () => {
          router.push('/custom');
        }
      ">
      custom
    </button>
    <button
      @click="
        () => {
          router.push('/admin');
        }
      ">
      admin
    </button>
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import { filterRoleRoutes } from "./router";
import { Role, useUserRoleStore } from "./store/user";
import { useRouter } from "vue-router";
import { useRoutesStore } from "./store/permission";

const userRoleStore = useUserRoleStore();
const router = useRouter();
const routeStore = useRoutesStore();

const changeRoleFn = async (role: Role) => {
  userRoleStore.changeRole(role);

  // 内存添加路由表
  const filterRoutes = routeStore.filterRoutes(userRoleStore.role);
  filterRoutes.forEach((item) => {
    router.addRoute(item);
  });
  // 路由更新，删除不符合当前身份的路由
  filterRoleRoutes();
  routeStore.filterRoutes(role);
};

// TODO每次刷新的时候检查下更新路由表
const filterRoutes = routeStore.filterRoutes(userRoleStore.role);
filterRoutes.forEach((item) => {
  router.addRoute(item);
});

// TODO 这里如果不手动更新跳转的话，route.path的值实际上是'/' 而不是你浏览器上显示的网络地址
router.push(location.hash.replace(/#/, ""));
</script>

<style scoped></style>
