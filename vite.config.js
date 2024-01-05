import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],

  // 软链接
  resolve: {
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    alias: {
      "@": join(__dirname, "/src"),
    },
  },
  // 代理
  server: {
    host: "0.0.0.0",
    proxy: {
      // 代理所有 /index 的请求，该求情将被代理到 target 中
      "/api": {
        // 代理请求之后的请求地址
        target: "http://localhost:8080/shopping/",
        // 跨域
        changeOrigin: true,
        ws: true,
        // 重写路径，去掉 /api，如果不写，请求地址为 http://localhost:8080/shopping/api
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
