import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  if (process.env.NODE_ENV === 'production' && !globalThis.$io) {
    const { Server: SocketServer } = await import('socket.io')
    // @ts-ignore
    globalThis.$io = new SocketServer(event.node.req.socket?.server)
  }
})
