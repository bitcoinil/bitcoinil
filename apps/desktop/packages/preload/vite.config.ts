import { builtinModules } from 'module'
import { defineConfig } from 'vite'
// import copy from 'rollup-plugin-copy'
import pkg from '../../package.json'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  root: __dirname,
  plugins: [
    // copy({
    //   targets: [
    //     {
    //       src: '../../../packages/themes/dist/themes',
    //       // dest: 'packages/renderer/public'
    //       dest: "dist/preload/themes",
    //     }
    //   ]
    // })
    viteStaticCopy({
      targets: [
        {
          // src: '../../../node_modules/@djitsu/themes/dist/themes',
          src: '../../../../packages/themes/dist/themes',
          // dest: 'packages/renderer/public'
          // dest: "themes",
          dest: '../../packages/renderer/public/themes',
          rename: ''
        }
      ],
      watch: {
        reloadPageOnChange: true
      }
    })
  ],
  build: {
    outDir: '../../dist/preload',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].cjs'
    },
    minify: process.env./* from mode option */ NODE_ENV === 'production',
    rollupOptions: {
      external: [
        'electron',
        ...builtinModules,
        ...Object.keys(pkg.dependencies || {})
      ]
    }
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: 1 + pkg.env.VITE_DEV_SERVER_PORT,
  },
})
