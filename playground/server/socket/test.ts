import { defineIOHandler } from '../../../src/runtime/helpers'

export default defineIOHandler((io) => {
  io.on('connection', (socket) => {
    console.log('Connected ', socket.id)
  })
})
