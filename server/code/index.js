"use strict";

const http = require('http');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const socketIO = require('socket.io');

const routes = require('./routes.js');
const events = require('./events.js');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views/'));

let port = config.port || 3000;
let server = http.createServer(app);

server.listen(port);
server.on('listening', onListening);
server.on('error', onError);

let io = socketIO(server);
events(io, app);

function onListening(){
	console.log("Listening : " + JSON.stringify(server.address()));
}

function onError(err){
	console.log(JSON.stringify(err));
}
