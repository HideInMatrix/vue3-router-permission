import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
function getRoutes() {
  const routes = [
    // 私有路由，请在这里添加
    ...privateRoutes,

    // 公共路由
    ...publicRoutes,
  ];
  /**
   * 如果要对 routes 做一些处理，请在这里修改
   */
  return routes;
}


const router = createRouter({
  history: createWebHistory(),
  routes: getRoutes(),
});

// 全局前置守卫，这边可以对身份进行验证
router.beforeEach((to, _from, next) => {

  let userRole = "admin";
  // 如果目标路由没有角色限制
  if (!to.meta.role) {
    next();
  }
  // 判断当前用户角色是否在目标路由的允许角色列表中
  if ((to.meta.role as string[]).includes(userRole)) {
    // 如果角色匹配，允许进入目标路由
    next();
  } else {
    // 如果角色不匹配，跳转到 unauthorized 页面
    next({ path: "/unauthorized" });
  }
});

// 监听路由变化，动态设置网页标题
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
});

export default router;
