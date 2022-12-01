import { useNuxtApp } from '#app'

export function useSocket () {
  const { $socket } = useNuxtApp()
  return $socket
}

export function useIO () {
  const { $io } = useNuxtApp()
  return $io
}
