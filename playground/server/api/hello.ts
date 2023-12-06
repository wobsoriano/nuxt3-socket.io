export default eventHandler((event) => {
  console.log(globalThis.__io)

  return {
    hello: 'world'
  }
})
