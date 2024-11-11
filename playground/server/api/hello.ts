export default eventHandler(() => {
  // @ts-expect-error: todo fix types
  console.log(globalThis.__io)

  return {
    hello: 'world',
  }
})
