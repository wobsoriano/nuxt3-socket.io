import type { Server } from 'http'
import { Server as SocketServer } from 'socket.io'
import { eventHandler } from 'h3'
import { useRuntimeConfig } from '#imports'

const runtimeConfig = useRuntimeConfig()

export function createIOHandler<T extends Record<string, (io: SocketServer) => void>> (functions: T) {
  return eventHandler((event) => {
    // @ts-ignore
    if (!event.node.req.$io) {
      const httpServer = (event.node.req.socket as any).server as Server
      const io = new SocketServer(httpServer, runtimeConfig.serverOptions)

      Object.keys(functions).forEach((fn) => {
        functions[fn](io)
      })

      // @ts-ignore
      event.node.req.$io = io
    }

    return {
      ok: true
    }
  })
}
