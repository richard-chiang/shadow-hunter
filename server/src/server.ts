import {Server, WebSocket} from "ws";

import {ServerMessage, Action} from '../../client/models/server-message';
import {Room} from "./models/room";
import {Client} from "./models/client";

interface Map<T> {
    [K:string]:T;
}

export class DC {
    public static wss:Server;

    public static rooms:Map<Room> = {};

    constructor(port:number) {
        console.log(`Started server on port ${port}`);
        let wss = DC.wss = new Server({port: port});

        wss.on('connection', ws => {
            ws.on('message', data => {
                this.onMessage(ws, JSON.parse(data));
            });

            DC.send(ws, Action.Info, 'hello');
        });
    }

    onMessage(client:WebSocket, message:ServerMessage) {
        console.log(message);
        if (message.action === Action.CreateGame) {

            let room = message.data.room;
            let player = message.data.player;
            if (DC.rooms[room]) {
                return DC.send(client, Action.Error, 'Room already exists');
            }
            let playerClient = new Client(player, room, client);
            DC.rooms[room] = new Room(room, player, [playerClient]);
            DC.rooms[room].create();
            DC.rooms[room].update();

        } else if (message.action === Action.JoinGame) {

            let room = message.data.room;
            let player = message.data.player;
            if (!DC.rooms[room]) {
                return DC.send(client, Action.Error, 'Room does not exist');
            }
            let playerClient = new Client(player, room, client);
            playerClient.id = DC.rooms[room].players.length;
            DC.rooms[room].players.push(playerClient);
            DC.rooms[room].update();
        } else if (message.action === Action.StartGame) {

            let room = message.data.room;
            DC.rooms[room].start();
        }
    }

    public static send(client:WebSocket, action:Action, data:any) {
        client.send(JSON.stringify(new ServerMessage(action, data)));
    }

    public static sendMessage(client:WebSocket, message:ServerMessage) {
        client.send(JSON.stringify(message));
    }

    public static broadcastToAll(message:ServerMessage) {
        DC.wss.clients.forEach(client => {
            DC.sendMessage(<WebSocket>client, message);
        });
    }

    public static broadcastMessage(room:string, message:ServerMessage) {
        DC.rooms[room].players.forEach(player => {
            DC.sendMessage(player.socket, message);
        });
    }

    public static broadcast(room:string, action:Action, data:any) {
        DC.rooms[room].players.forEach(player => {
            DC.send(player.socket, action, data);
        });
    }

    public static waitFor(socket:WebSocket, action:Action) {
        return new Promise<ServerMessage>((resolve, reject) => {
            //console.log((<any>socket).listenerCount('message'));
            let timeOut = setTimeout(() => {
                (<any>socket).removeListener('message', handler);
                reject();
            }, 90000); //90000
            let handler = (data) => {
                let message = JSON.parse(data);
                if (message.action === action) {
                    (<any>socket).removeListener('message', handler);
                    clearTimeout(timeOut);
                    resolve(message);
                }
            };
            (<any>socket).addListener('message', handler);
        });
    }
}