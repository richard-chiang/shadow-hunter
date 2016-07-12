import {Injectable} from '@angular/core';
import {$WebSocket} from "./vendor/angular2-websocket";
import {Game, GameStatus} from "../models/game";
import {Subject} from "rxjs/Subject";
import {ServerMessage, Action} from "../models/server-message";
import {Player} from "../models/player";
import {TurnEvent} from "../models/turnevent";

let serverAddress = location.hostname === "perturbed-penguin.2016.angularattack.io" ? "jccr.me" : location.hostname;

@Injectable()
export class SessionService {
    private ws = new $WebSocket(`ws://${serverAddress}:8777`);

    private gameStateSource = new Subject<Game>();
    private playerStateSource = new Subject<Player>();
    private playerJoinSource = new Subject<Player>();
    private turnStateSource = new Subject<TurnEvent>();
    private actionEventSource = new Subject<ServerMessage>();

    private playerList:string[] = [];

    private startingPlayer:string;
    private roomName:string;

    gameStateChanged$ = this.gameStateSource.asObservable();
    playerStateChanged$ = this.playerStateSource.asObservable();
    turnStateChanged$ = this.turnStateSource.asObservable();
    playerJoined$ = this.playerJoinSource.asObservable();
    actionEvent$ = this.actionEventSource.asObservable();


    constructor() {
        this.send(Action.Info, 'hello');

        let actionEvents = [
            Action.AreaEffect, //Response: AreaEffect(), SkipArea()
            Action.MoveToArea, //Response: MoveToArea(newArea)
            Action.Attack, //Response: Attack(target), SkipAttack()
        ];
        this.ws.getDataStream().subscribe(
            res => {
                let message:ServerMessage = JSON.parse(res.data);

                if (message.action === Action.GameStateChange) {
                    this.gameStateSource.next(message.data);
                } else if (message.action === Action.PlayerStateChange) {
                    this.playerStateSource.next(message.data);
                    if (!_.includes(this.playerList, message.data.name)) {
                        this.playerList.push(message.data.name);
                        console.log('Player joined:', message.data);
                        this.playerJoinSource.next(message.data);
                    }
                } else if (message.action === Action.TurnStateChange) {
                    this.turnStateSource.next(message.data);
                } else if (_.includes(actionEvents, message.action)) {
                    this.actionEventSource.next(message);
                }
                console.log('Got message: ', message);
            },
            function (e) {
                console.log('Error: ' + e.message);
            },
            function () {
                console.log('Disconnected.');
            }
        );
    }

    send(action:Action, data:any) {
        this.ws.send(new ServerMessage(action, data));
    }

    join(room:string, player:string) {
        this.send(Action.JoinGame, {room, player});
    }

    create(room:string, player:string) {
        this.startingPlayer = player;
        this.roomName = room;
        this.send(Action.CreateGame, {room, player});
    }

    start() {
        let room = this.roomName;
        let player = this.startingPlayer;
        this.send(Action.StartGame, {room, player});
    }

}
