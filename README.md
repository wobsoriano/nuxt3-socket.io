# nuxt3-socket.io

Just another [socket.io](https://socket.io/) module for Nuxt 3.

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

Like `server/api` and `server/middleware`, you can expose your functions inside `server/socket` folder to access the server instance:

```ts
// server/socket/log.ts

import { defineIOHandler } from 'nuxt3-socket.io'

export default defineIOHandler((io) => {
  io.on('connection', (socket) => {
    console.log('Connected ', socket.id)
  })
})
```

The server instance is also available in the request object as `$io`:

```ts
export default eventHandler((event) => {
  const $io = event.node.req.$io

  if ($io) {
    console.log('do something...')
  }
})
```

It's recommended to roll your own socket server if you need more customization other than what is specified here.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

MIT
