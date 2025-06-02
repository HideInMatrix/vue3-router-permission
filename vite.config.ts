import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoComplete from "unplugin-auto-import/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import UnoCSS from 'unocss/vite'


import svgBuilder from "./plugins/svgBuilder";

const pathSrc = resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.svg"],
  base: "./" /* 这个就是webpack里面的publicPath */,
  build: {
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }, // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: "js/[name].[hash].js", // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: "js/[name].[hash].js", // 用于输出静态资源的命名，[ext]表示文件扩展名
      },
    },
  },
  plugins: [
    vue(),
    basicSsl(),
    UnoCSS(),
    svgBuilder(resolve("./public/icons")), // svg存储的名字
    AutoComplete({
      imports: [
        "vue",
        "vue-router",
        "pinia", // 自动导入 Pinia API（如 defineStore）
      ],
      dts: resolve(pathSrc, "auto-imports.d.ts"),
    }),
  ],
  resolve: {
    alias: {
      "@/": `${pathSrc}/`,
    },
  },
  server: {
    host: "127.0.0.1",
    port: 3001,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    https: {},
    hmr: false,
    cors: true, // 默认启用并允许任何源
  },
  esbuild: {
    drop: ["debugger"],
  },
  optimizeDeps: { // 在开发服务器启动时预构建依赖，将 CommonJS/UMD 模块转换为 ESM 格式，并缓存结果以提高性能。
    include: [],
  },
});
