import type { Server } from 'http'
import { eventHandler } from 'h3'

export default eventHandler(async (event) => {
  const httpServer = (event.node.req.socket as any).server as Server & {
    __io: any
  }

  if (!httpServer.__io) {
    const { Server: SocketServer } = await import('socket.io')
    // @ts-ignore
    httpServer.__io = new SocketServer(httpServer, {
      path: '/api/socket.io'
    })
  }

  return {
    ok: true
  }
})
