# nuxt3-socket.io

Just another [socket.io](https://socket.io/) module for Nuxt 3.

## Install

```bash
pnpm add nuxt3-socket.io
```

## Usage

```vue
<script setup>
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
</script>

<template>
  <div>Connected: {{ connected }}</div>
</template>
```

Yep, that's it.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

MIT
