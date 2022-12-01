import { useNuxtApp } from '#app'

export function useSocket () {
  const { $socket } = useNuxtApp()
  return $socket
}
