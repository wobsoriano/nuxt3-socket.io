import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { io } = await import('socket.io-client')

  nuxtApp.provide('io', io)
})

declare module '#app' {
  interface NuxtApp {
    $io: typeof import('socket.io-client')['io']
  }
}
