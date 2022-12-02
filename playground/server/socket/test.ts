import { defineIOHandler } from '../../../src/module'

export default defineIOHandler((io) => {
  io.on('connection', (socket) => {
    console.log('Connected ', socket.id)
  })
})
