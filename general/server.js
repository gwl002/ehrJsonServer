const jsonServer = require('json-server');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();
const router = jsonServer.router(require("./patientPortalData.js")());
const port = process.env.PORT || 8005;


server.use(middlewares);
server.use(router);


server.listen(port);