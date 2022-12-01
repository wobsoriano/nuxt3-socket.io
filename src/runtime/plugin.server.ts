import getURL from 'requrl'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const baseURL = getURL(nuxtApp.ssrContext?.event.node.req)
  await $fetch('/api/__init_socket', {
    baseURL
  })
})
