const server = require('express')();
const routes  = require('./routes');

server.set("view engine", "pug");
server.set("views", './views');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use("/", routes);
server.listen(3000);
