module.exports = function render (port) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset='utf-8'>
      <title></title>
      <script type='text/javascript' src='/socket.io/socket.io.js'></script>
      <script>
        var socket = io.connect('http://localhost:${port}')
        socket.on('request', console.dir)
      </script>
    </head>
    <body>
      hello! fancy a chat? open the console!
    </body>
  </html>
`
}
