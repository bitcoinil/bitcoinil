import { spawn } from 'child_process'
import { createServer, build } from 'vite'
import electron from 'electron'

const query = new URLSearchParams(import.meta.url.split('?')[1])
const debug = query.has('debug')

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchMain(server) {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null
  const address = server.httpServer.address()
  const env = Object.assign(process.env, {
    VITE_DEV_SERVER_HOST: address.address,
    VITE_DEV_SERVER_PORT: address.port
  })
  /**
   * @type {import('vite').Plugin}
   */
  const startElectron = {
    name: 'electron-main-watcher',
    writeBundle() {
      electronProcess && electronProcess.kill()
      electronProcess = spawn(electron, ['.'], { stdio: 'inherit', env })
    }
  }

  return build({
    configFile: 'packages/main/vite.config.ts',
    mode: 'development',
    plugins: [!debug && startElectron].filter(Boolean),
    build: {
      watch: true
    }
  })
}

/**
 * @type {(server: import('vite').ViteDevServer) => Promise<import('rollup').RollupWatcher>}
 */
function watchPreload(server) {
  return build({
    configFile: 'packages/preload/vite.config.ts',
    mode: 'development',
    plugins: [
      {
        name: 'electron-preload-watcher',
        writeBundle() {
          server.ws.send({ type: 'full-reload' })
        }
      }
    ],
    build: {
      watch: true
    }
  })
}

const init = async () => {
  // bootstrap
  const server = await createServer({
    configFile: 'packages/renderer/vite.config.ts'
  })

  await server.listen()
  await watchPreload(server)
  await watchMain(server)
}

// const checkDeps = async () => {
//   const data = await import('@djitsu/themes').catch((error) => {
//     console.log('Error loading themes:', error)
//   })
//   if (!data) {
//     console.log('Waiting for themes to become available...')
//     await new Promise((resolve) => setTimeout(resolve, 1000))
//     checkDeps()
//   } else init()
// }

init()
