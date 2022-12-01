import type { Server } from 'http'
import { eventHandler } from 'h3'

export default eventHandler(async (event) => {
  if (!(event.node.req.socket as any).server.__io) {
    const httpServer = (event.node.req.socket as any).server as Server
    const { Server: SocketServer } = await import('socket.io')
    const io = new SocketServer(httpServer, {
      path: '/api/socket.io'
    })

    // @ts-ignore
    event.node.req.socket.server.__io = io
  }

  return {
    ok: true
  }
})
