import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler, addPlugin, addImports, addTemplate } from '@nuxt/kit'
import { resolve } from 'pathe'
import fg from 'fast-glob'
import { Server as SocketServer } from 'socket.io'

export interface ModuleOptions {
  addPlugin: boolean
}

export function defineIOHandler (cb: (io: SocketServer) => void) {
  return cb
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-socket.io',
    configKey: 'socket'
  },
  defaults: {
    addPlugin: true
  },
  async setup (options, nuxt) {
    const extGlob = '**/*.{ts,js,mjs}'
    const files: string[] = []

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.hook('builder:watch', async (e, path) => {
      if (e === 'change') { return }
      if (path.includes('server/socket')) {
        await scanRemoteFunctions()
        await nuxt.callHook('builder:generateApp')
      }
    })

    if (options.addPlugin) {
      addPlugin(resolve(runtimeDir, 'plugin.client'))

      addImports([
        {
          name: 'useSocket',
          from: resolve(runtimeDir, 'composables')
        },
        {
          name: 'useIO',
          from: resolve(runtimeDir, 'composables')
        }
      ])
    }

    addServerHandler({
      route: '/socket.io',
      handler: resolve(nuxt.options.buildDir, 'io-handler.ts')
    })

    await scanRemoteFunctions()

    addTemplate({
      filename: 'io-handler.ts',
      write: true,
      getContents () {
        return `
          import { createIOHandler } from '${resolve(runtimeDir, 'server')}';
          ${files.map((file, index) => `import function${index} from '${file.replace('.ts', '')}'`).join('\n')}
          export default createIOHandler({
            ${files.map((_, index) => `function${index}`).join(',\n')}
          })
        `
      }
    })

    async function scanRemoteFunctions () {
      files.length = 0
      const updatedFiles = await fg(extGlob, {
        cwd: resolve(nuxt.options.srcDir, 'server/socket'),
        absolute: true,
        onlyFiles: true
      })
      files.push(...new Set(updatedFiles))
      return files
    }
  }
})
