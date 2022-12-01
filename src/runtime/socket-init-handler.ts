import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // @ts-ignore
  if (!event.node.req.socket.server.__io) {
    const { Server: SocketServer } = await import('socket.io')
    // @ts-ignore
    event.node.req.socket.server.__io = new SocketServer(event.node.req.socket.server)
  }

  // @ts-ignore
  event.context.$io = event.node.req.socket.server.__io
})
