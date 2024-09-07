import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";
import { useUserRoleStore } from "../store/user";

import { userRoutes } from "./user";
import { adminRoutes } from "./admin";
import { customRoutes } from "./custom";
import { useRoutesStore } from "../store/permission";

// 导出所有的私密路由
export const privateRoutes = userRoutes
  .concat(adminRoutes)
  .concat(customRoutes);

const Home = () => import("../pages/home.vue");
const Error = () => import("../pages/error.vue");

export const publicRoutes: RouteRecordRaw[] = [
  { name: "home", component: Home, children: [], path: "/" },
  { name: "error", component: Error, children: [], path: "/error" },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

// router.isReady().then(async () => {
//   await addRoleRouters(); // 添加动态路由
//   console.log("路由加载完了");
// });

//TODO 全局路由，跳转前，看是路由是否存在
// 假设用户时已经登陆的，这里只是做路由的动态修改操作
router.beforeEach(async (to, from, next) => {
  const userRoleStore = useUserRoleStore();
  const routeStore = useRoutesStore();
  const filterRoutes = routeStore.filterRoutes(userRoleStore.role);
  filterRoutes.forEach((item) => {
    router.addRoute(item);
  });
  const exist = router.getRoutes().some((route) => route.path === to.path);
  console.log("跳转前", router.getRoutes(), to.path, exist);
  if (exist) {
    next();
  } else {
    next(false);
    router.push("/error");
  }
});

//TODO 抛出添加路由的方法

export const filterRoleRoutes = async () => {
  const userRoleStore = useUserRoleStore();

  let preRoutes = router.getRoutes();
  preRoutes.forEach((route) => {
    if (
      route.meta.role &&
      route.meta.role !== userRoleStore.role &&
      route.name
    ) {
      router.removeRoute(route.name.toString());
    }
  });
};
