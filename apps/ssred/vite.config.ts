import { defineConfig } from "vite"
import reactRefresh from "@vitejs/plugin-react-refresh"
import type { PluginOption } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh() as PluginOption],
  build: {
    minify: false,
  },
  root: '',
  server: {
    hmr: {
      port: 39910
    }
  }
})
