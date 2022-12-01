import type { H3Event } from 'h3'
import getURL from 'requrl'

export async function localConnect (event: H3Event) {
  const baseURL = getURL(event.node.req)
  await $fetch('/api/socket.io', {
    baseURL
  })
}
