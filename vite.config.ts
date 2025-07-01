import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "TypiCLIVitePlugin",
      fileName: "vite-plugin",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vite", "path", "fs", "esbuild"],
    },
    target: "node20",
    minify: false,
  },
  plugins: [dts()],
});
