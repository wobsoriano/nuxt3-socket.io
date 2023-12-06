<script setup lang="ts">
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
