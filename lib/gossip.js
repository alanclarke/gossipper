#!/usr/bin/env node

var _ = require('lodash')
var express = require('express')
var program = require('commander')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var meta = require('../package.json')

program
  .version(meta.version)
  .option('-p, --port [n]', 'port', 3002)
  .parse(process.argv)

var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.all('/*', function (req, res) {
  io.sockets.emit('request', _.pick(req, ['body', 'cookies', 'headers', 'method', 'params', 'query', 'url']))
  res.render('../templates/index.jade', { port: program.port })
})

server.listen(program.port)

console.log('server started at ' + program.port)
