/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        FanucMacroB: "./src/index.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  test: {
    env: {
      NEARLY_EQUAL_PRECISION: "5",
    },
    setupFiles: ["./tests/setup.ts"],
  },
  plugins: [react()],
});
