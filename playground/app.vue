<script setup lang="ts">
import { io } from 'socket.io-client'
import { onMounted, ref } from '#imports'

const connected = ref(false)

onMounted(() => {
  const socket = io()

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
