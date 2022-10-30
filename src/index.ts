import Redis from "ioredis";
import { Socket } from "socket.io";
require('dotenv').config();

var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server);
const redis: Redis = require("./helpers/init_redis")(io);

const registerUserHandlers = require("./handlers/user_handler");
const onConnection = (socket: Socket) => {
    registerUserHandlers(socket, redis);
};

io.on('connection', onConnection);
var broadcastPort = process.env.BROADCAST_PORT;
server.listen(broadcastPort, function () {
    console.log('Socket server is running.');
});