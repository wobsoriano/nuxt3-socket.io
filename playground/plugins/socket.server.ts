import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxt) => {
  globalThis.$io.on('connection', (socket) => {
    console.log('connected', socket.id)
  })
})
