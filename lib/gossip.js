var _ = require("lodash"),
 config = require("../config/config"),
 express = require("express"),
 app = express(),
 server = require("http").createServer(app),
 io = require("socket.io").listen(server);

app.use(express.bodyParser());
app.use(express.cookieParser());

function parseReq(req) {
  return _.pick(req, ["headers", "method", "url", "body", "query", "cookies"]);
}

app.all("/*", function (req, res) {
  io.sockets.emit("request", parseReq(req));
  res.render("../templates/index.jade");
});

server.listen(config.port);