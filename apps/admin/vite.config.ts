import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 39911
    }
  }
});
