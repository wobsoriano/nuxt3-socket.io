import type { Server } from 'http'
import { eventHandler } from 'h3'

// Pass the IO to event.context.$io for easy access
export default eventHandler((event) => {
  const httpServer = (event.node.req.socket as any).server as Server & {
    __io: any
  }

  event.context.$io = httpServer.__io
})
