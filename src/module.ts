import { fileURLToPath } from 'url'
import { defineNuxtModule, addTemplate, addServerHandler, addPlugin, addImports } from '@nuxt/kit'
import { resolve } from 'pathe'

export interface ModuleOptions {
  addPlugin: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-socket.io',
    configKey: 'socket'
  },
  defaults: {
    addPlugin: true
  },
  setup (options, nuxt) {
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    if (options.addPlugin) {
      addPlugin(resolve(runtimeDir, 'plugin.client'))

      addImports({
        name: 'useSocket',
        from: resolve(runtimeDir, 'composables')
      })
    }

    addServerHandler({
      middleware: true,
      handler: resolve(runtimeDir, 'socket-init-handler')
    })

    addTemplate({
      filename: 'types/socket-io.d.ts',
      getContents () {
        return `
          declare module 'h3' {
            interface H3EventContext {
              $io: typeof import('socket.io')['Server']
            }
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
