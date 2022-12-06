import type { Server } from 'http'
import { Server as SocketServer, ServerOptions } from 'socket.io'
import { eventHandler } from 'h3'

declare global {
  // eslint-disable-next-line no-var
  var __io: SocketServer
}

export function createIOHandler<T extends Record<string, (io: SocketServer) => void>> (functions: T, serverOptions: Partial<ServerOptions>) {
  return eventHandler((event) => {
    if (!globalThis.__io && process.env.NODE_ENV === 'production') {
      const httpServer = (event.node.req.socket as any).server as Server
      const io = new SocketServer(httpServer, serverOptions)

      Object.keys(functions).forEach((fn) => {
        functions[fn](io)
      })

      globalThis.__io = io
    }
  })
}
