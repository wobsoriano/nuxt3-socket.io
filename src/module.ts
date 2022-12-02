import { fileURLToPath } from 'url'
import { defineNuxtModule, addServerHandler, addPlugin, addImports } from '@nuxt/kit'
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
      handler: resolve(runtimeDir, 'handler')
    })
  }
})
