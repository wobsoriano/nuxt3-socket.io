import type { Server } from 'http'
import { eventHandler, NodeIncomingMessage } from 'h3'

export default eventHandler(async (event) => {
  // @ts-ignore
  if (!event.node.req.$io) {
    const httpServer = (event.node.req.socket as any).server as Server
    const { Server: SocketServer } = await import('socket.io')
    const io = new SocketServer(httpServer)

    // @ts-ignore
    event.node.req.$io = io
  }

  return {
    ok: true
  }
})
