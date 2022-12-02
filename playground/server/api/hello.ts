export default eventHandler(async (event) => {
  console.log(globalThis.__io)

  return {
    hello: 'world'
  }
})
