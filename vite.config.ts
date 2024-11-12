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
  test: {
    env: {
      NEARLY_EQUAL_PRECISION: "5",
    },
    setupFiles: ["./tests/setup.ts"], // Include the setup file where the matcher is defined
  },
  plugins: [react()],
});
