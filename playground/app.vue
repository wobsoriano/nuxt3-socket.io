<script setup lang="ts">
const { $io } = useNuxtApp()

const connected = ref(false)

onMounted(() => {
  const socket = $io('http://localhost:3000')

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
