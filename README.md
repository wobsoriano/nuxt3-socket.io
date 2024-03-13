# nuxt3-socket.io

> [!WARNING]  
> This module will soon be deprecated in favor of the built-in [WebSocket API](https://nitro.unjs.io/guide/websocket).

Just another [socket.io](https://socket.io/) module for Nuxt 3.

This module uses the Vite server in development and `req.socket.server` in production.

## Install

```bash
pnpm add nuxt3-socket.io
```

```ts
export default defineNuxtConfig({
  modules: ['nuxt3-socket.io'],
  socket: {
    // JSON serializable options only.
    // options object to pass when instantiating socket server.
    serverOptions: {}
  }
})
```

## Usage

### Client

```vue
<script setup>
// Default
const socket = useSocket()

const connected = ref(false)

onMounted(() => {
  socket.on('connect', () => {
    connected.value = socket.connected
  })

  socket.on('disconnect', () => {
    connected.value = socket.connected
  })
})

// Custom
const { $io } = useNuxtApp()

onMounted(() => {
  const socket2 = $io('http://localhost:3069')
})
</script>

<template>
  <div>Connected: {{ connected }}</div>
</template>
```

### Server

By default, this module automatically creates a server instance. If you want access to that server instance, you can expose functions inside `server/socket` and use the `defineIOHandler` wrapper function:

```ts
// server/socket/example.ts
import { defineIOHandler } from 'nuxt3-socket.io/helpers'

export default defineIOHandler((io) => {
  io.on('connection', (socket) => {
    console.log('Connected ', socket.id)
  })
})
```

It's recommended to roll your own socket server if you need more customization other than what is specified here.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

MIT
