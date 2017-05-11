#!/usr/bin/env node

const _ = require('lodash')
const express = require('express')
const program = require('commander')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const render = require('./render')

const meta = require('../package.json')

program
  .version(meta.version)
  .option('-p, --port [n]', 'port', 3002)
  .parse(process.argv)

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.all('/*', function (req, res) {
  io.sockets.emit('request', _.pick(req, ['body', 'cookies', 'headers', 'method', 'params', 'query', 'url']))
  res.end(render(program.port))
})

server.listen(program.port)

console.log('server started at ' + program.port)
