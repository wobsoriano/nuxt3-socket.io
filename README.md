# nuxt3-socket.io

Just another [socket.io](https://socket.io/) module for Nuxt 3.

It uses the `server` object inside `req.socket` instead of the one provided by the `listen` Nuxt hook.

## Install

```bash
pnpm add nuxt3-socket.io
```

```ts
export default defineNuxtConfig({
  modules: ['nuxt3-socket.io'],
  socket: {
    // JSON serializable options only.
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

// Custom
const io = useIO()
const socket2 = io('http://localhost:3069')

const connected = ref(false)

onMounted(() => {
  socket.on('connect', () => {
    connected.value = socket.connected
  })

  socket.on('disconnect', () => {
    connected.value = socket.connected
  })
})
</script>

<template>
  <div>Connected: {{ connected }}</div>
</template>
```

### Server

By default, this module automatically creates a server instance. If you want access to that server instance, you can expose functions inside `server/socket` and use the `defineIOHandler` wrapper function:

```ts
// server/socket/whatever-file-name.ts

import { defineIOHandler } from 'nuxt3-socket.io'

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
