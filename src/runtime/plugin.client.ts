import { defineNuxtPlugin } from '#app'
import { io } from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const socket = io()

  return {
    provide: {
      socket,
      io
    }
  }
})
