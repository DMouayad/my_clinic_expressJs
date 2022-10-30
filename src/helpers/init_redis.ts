import Redis from "ioredis";
import { Socket } from "socket.io";

require('dotenv').config();
module.exports = (io: Socket) => {

    var redisPort = process.env.REDIS_PORT;
    var redisHost = process.env.REDIS_HOST;
    var ioRedis = require('ioredis');
    var redis: Redis = new ioRedis(redisPort, redisHost);

    redis.on('message', function (channel: string, message: string): void {
        let messageContent = JSON.parse(message);
        console.log("redis - " + channel + ':' + messageContent.event);
        io.emit(channel + ':' + messageContent.event, messageContent.data);
    });

    return redis;
}