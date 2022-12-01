export default eventHandler((event) => {
  console.log(event.context.$io)
  return {
    hello: 'world'
  }
})
