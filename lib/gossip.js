#!/usr/bin/env node

var _ = require("lodash"),
 program = require("commander"),
 express = require("express"),
 meta = require("../package.json");


program
  .version(meta.version)
  .option('-p, --port [n]', 'port', 3002)
  .parse(process.argv);

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
app.all("/*", function (req, res) {
    io.sockets.emit("request", _.pick(req, ["body", "cookies", "headers", "method", "params", "query", "url"]));
    res.render("../templates/index.jade");
});

server.listen(program.port);

console.log("server started at " + program.port);