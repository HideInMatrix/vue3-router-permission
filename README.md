# Vue 3 + TypeScript + Vite 6.x + VueRouter 4.x + Pinia 模板

pnpm作为包管理，主要可以解决幽灵依赖包的问题

1. Pinia 状态管理库带加密功能
    本地建立.env
    文件中`VITE_SECRET_KEY=xxx`

2. 自定义Axios 加密参数 错误日志记录

3. VueRouter 4.x 路由 权限控制 动态缓存
    import { removeKeepAliveCache, resetKeepAliveCache } from '@/router/keepAlive'
    const instance = getCurrentInstance()!
    onBeforeRouteLeave((to) => {
        if (to.path === '/C') {
            removeKeepAliveCache(instance)
        } else {
            resetKeepAliveCache(instance)
        }
    })
    通过 removeKeepAliveCache, resetKeepAliveCache 来维护exclude数组里面的内容达到 a 进入C后返回到A页面时，a页面的缓存被清楚，进入其他页面返回则不被清除缓存

    权限控制
    有身份权限的写在privateRoutes.ts中
    没有身份权限的写在publicRoutes.ts中

    
    这里仅仅暂时如果要标记页面的身份以及页面动画该怎么配置
    ```typescript
    export const privateRoutes = [
        {
            path: "/a",
            name: "a",
            meta: {
            title: "a",
            transition: "fade",
            role: ["admin"],
            },
            component: () => import("../views/a.vue"),
        },
    ];
    ```

4. 项目版本检测，确保启动顺利。检测node版本和工具包的版本是否符合要求。
    可以根据项目需求修改package.json中的engines字段。
    ``` shell
    pnpm run check-env
    ```
5. prettier 统一的代码格式，这样保存格式化的时候就不会因为不同的格式化工具导致其他的内容也出现修改。vscode配合prettier插件
    .prettierrc.json的内容就是指定代码的格式的配置文件

6. SvgIcon组件，更加优雅的使用svg图片
    将图片放入到 /public/icons 下面，name就是图片的名字例如certificate.svg
    ``` html
    <SvgIcon name="certificate" class="w-10 h-10"></SvgIcon>

    ```
    推荐使用较少的svg代码图片，不然html的体积会进一步增大

    如果是大的背景图推荐使用`vite`的动态导入

    ```typescript

    const getPath = async () => {
        const { default: svg } = await import("/src/assets/svg-img/certificate.svg?raw");
        test.value = svg;
    };

    getPath();

    ```

7. unocss 即时原子 CSS 引擎。主要想解决遍地css文件的麻烦。预设了tailwind css的预算值。所以可以直接对着tailwind css的官方文档编写

8. composables 这个文件夹推荐将业务逻辑写在此处的x.ts文件内，然后搭配 vue3的组合式语法。解决视图层和业务层的代码分离。

9. 异步加载动态组件, 针对大的页面要加载很多的JS，可以异步错开或者等待条件允许再加载。看个人业务需求
   ```html

   <component :is="currentComponent"></component>

   ```

   ```typescript

    let currentComponent = ref(defineAsyncComponent(() => import('@/components/TestComponent.vue')))
    let flag = false

    const handleClick = () => {
        if (flag) {
            currentComponent.value = defineAsyncComponent(() => import('@/components/TestComponent2.vue'));
        } else {
            currentComponent.value = defineAsyncComponent(() => import('@/components/TestComponent.vue'));
        }
        flag = !flag

    }
   ```

   10. 粒子权限控制
   在`directives`文件中有一个针对dom的指令，以便开发需要更加细致的权限控制
   ```html
    <button v-permission="['david']">david可以点</button>
    <button v-permission="['lisa']">lisa可以点</button>
   ```