import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or 'modern'
      },
    },
  },
  build: {
    lib: {
      entry: "lib/index.ts",
      formats: ["es"],
      fileName: "index",
    },
    copyPublicDir: false,
  },
  plugins: [dts({ tsconfigPath: "./tsconfig.lib.json" }), react()],
});
