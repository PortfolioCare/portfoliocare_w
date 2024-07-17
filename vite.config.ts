import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import electron from "vite-plugin-electron/simple";
import { viteMockServe } from "vite-plugin-mock";
import Icons from "unplugin-icons/vite";
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  console.log(mode);
  console.log(env);
  return {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [
      vue(),
      Icons({}),
      viteMockServe({
        mockPath: "src/mock/api", // mock 文件夹路径
        watchFiles: true,
        localEnabled: true,
        prodEnabled: true,
        injectCode: `import { setupProdMockServer } from './mock/mockProdServer'; setupProdMockServer();`,
      }),
      electron({
        main: {
          // Shortcut of `build.lib.entry`.
          entry: path.resolve(__dirname, "electron/main.ts"),
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: path.resolve(__dirname, "electron/preload.ts"),
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer:
          process.env.NODE_ENV === "test"
            ? // https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
              undefined
            : {},
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
