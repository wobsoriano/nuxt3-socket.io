export default eventHandler((event) => {
  console.log(event.node.req.socket.server.$io)

  return {
    hello: 'world'
  }
})
