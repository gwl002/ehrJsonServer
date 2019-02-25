const jsonServer = require('json-server');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();
const router = jsonServer.router(require("./olesData.js")());
const port = process.env.PORT || 8004;


server.use(middlewares);
server.use(router);

var ss = require("./olesData.js")();
console.log(ss);

server.listen(port);