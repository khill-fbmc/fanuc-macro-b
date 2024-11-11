import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        Playground: "index.html",
        FanucMacroB: "./src/index.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [react()],
});
