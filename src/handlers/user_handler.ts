import Redis from "ioredis";
import { Socket } from "socket.io";

module.exports = (socket: Socket, redis: Redis) => {
    const onStartListening = (message: { [x: string]: any; channel: string; }) => {
        redis.subscribe(message['channel'], function (err: any, count: any) {
            if (err) {
                console.error("Failed to subscribe: %s", message['channel']);
            }
            else {
                console.log("Subscribed to: " + message['channel']);
            }
        });
    };
    socket.on('start-listening', onStartListening);
    socket.on("disconnected", (_) => {
        redis.disconnect();
        console.log("disconnected");
    });
}