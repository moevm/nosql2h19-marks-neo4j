var app = require('./bin/app');
var http = require('http');

var server = http.createServer(app);
console.log("Server Started");