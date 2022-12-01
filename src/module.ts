import { fileURLToPath } from 'url'
import { defineNuxtModule, addTemplate, addServerHandler } from '@nuxt/kit'
import { resolve } from 'pathe'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-socket.io',
    configKey: 'socket'
  },
  defaults: {},
  setup (_, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Attach dev server on dev
    nuxt.hook('listen', async (devServer) => {
      const { Server: SocketServer } = await import('socket.io')
      // @ts-ignore
      globalThis.$io = new SocketServer(devServer)
    })

    addServerHandler({
      middleware: true,
      handler: resolve(runtimeDir, './handler.ts')
    })

    addTemplate({
      filename: 'types/socket-io.d.ts',
      getContents () {
        return `
          declare global {
            var $io: typeof import('socket.io')['Server']
          }
          export {}
        `
      }
    })

    nuxt.hook('prepare:types', (options) => {
      options.references.push({ path: resolve(nuxt.options.buildDir, 'types/socket-io.d.ts') })
    })
  }
})
