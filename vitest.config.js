import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; // Import the path module

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Define the alias
    },
  },
});
