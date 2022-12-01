import type { Server } from 'http'
import { eventHandler } from 'h3'

// Pass the IO to event.context.$io for easy access
export default eventHandler((event) => {
  const io = (event.node.req.socket as any).server.__io as any

  event.context.$io = io
})
