import { defineEventHandler } from 'h3'

export default defineEventHandler(async ({ node: { req: { socket } } }) => {
  // @ts-ignore
  if (!socket.server.$io) {
    const { Server: SocketServer } = await import('socket.io')
    // @ts-ignore
    socket.server.$io = new SocketServer(socket.server)
  }

  return {
    ok: true
  }
})
