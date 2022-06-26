import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import dotenv from 'dotenv'
dotenv.config()


console.log('🏘 DOTENV BASE_PATH:', process.env.BASE_PATH)

export default defineConfig({
  plugins: [reactRefresh(),
  
    viteStaticCopy({
      targets: [
        {
          // src: '../../../node_modules/@djitsu/themes/dist/themes',
          src: '../../packages/themes/dist/themes',
          // dest: 'packages/renderer/public'
          // dest: "themes",
          dest: './themes',
          rename: ''
        }
      ],
      watch: {
        reloadPageOnChange: true
      }
    })
  ],
  base: process.env.BASE_PATH || '/',
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 39911
    }
  }
});
