import {TurnLoop} from "./turnloop";
import {Room} from "./models/room";
import * as _ from 'lodash';
import {DC} from "./server";
import {Client} from "./models/client";
import {ServerMessage, Action} from '../../client/models/server-message';
import {TurnEvent, EventType} from '../../client/models/turnevent';
import {Util} from "./util";

function untilSuccess(executor) {
    var before_retry:any = undefined;
    var outer_executor = function (succeed, reject) {
        var rejection_handler = function (err) {
            if (before_retry) {
                try {
                    var pre_retry_result = before_retry(err);
                    if (pre_retry_result)
                        return succeed(pre_retry_result);
                } catch (pre_retry_error) {
                    return reject(pre_retry_error);
                }
            }
            return new Promise(executor).then(succeed, rejection_handler);
        };
        return new Promise(executor).then(succeed, rejection_handler);
    };

    var outer_promise:any = new Promise(outer_executor);
    outer_promise.next = function (func) {
        before_retry = func;
        return outer_promise;
    };
    return outer_promise;
}

export class GameLoop {
    public turns:TurnLoop;

    constructor(public room:Room) {
        //_.shuffle(_.map(room.players, p => p.id));
        this.turns = new TurnLoop(room.playersAsIds, this.onTurnsFullLoop);

        untilSuccess((end, step) => {
            let playerWithTurn = this.turns.nextTurn();
            this.startTurn(playerWithTurn).then(()=> {
                let winners = this.checkWinConditions();
                if (winners) {
                    end(winners);
                } else {
                    step(playerWithTurn);
                }
            });
        }).next((val) => {
            console.log("new turn: " + val);
            // Option 0: return falsey value and move on to next attempt
            // return

            // Option 1: uncomment to get early success..
            //if(err === "3 is too small!!")
            //    return "3 is sort of ok";

            // Option 2: uncomment to get complete failure..
            //if(err === "3 is too small!!")
            //    throw "3rd time, very unlucky";
        }).then((val) => {
            console.log("finally, game ends? winners:" + val);
        }).catch((err) =>{
            console.log("error, game loop ended: " + err);
        });
    }

    startTurn(playerId:number) {
        console.log('start turn', playerId);
        let player:Client = this.room.playersById[playerId];
        let roomName = this.room.name;
        DC.broadcast(roomName, Action.TurnStateChange, new TurnEvent(playerId, EventType.StartTurn));
        let prevArea = player.area;
        let areaRolled = Util.randomArea(prevArea);
        DC.send(player.socket, Action.MoveToArea, areaRolled);
        console.log('areaRolled', areaRolled);

        console.log('waiting for MoveToArea', areaRolled);
        let areaPromise = DC.waitFor(player.socket, Action.MoveToArea).then(message => {
            if (areaRolled === "any") {
                if (message.data === prevArea) {
                    return Util.randomArea("any");
                } else {
                    return message.data;
                }
            }
            return areaRolled;
        }, ()=> {
            if (areaRolled === "any") {
                return Util.randomArea("any");
            }
            return areaRolled;
        });


        return areaPromise.then(area => {
            console.log('areaPromise', area);

            DC.broadcast(roomName, Action.TurnStateChange, new TurnEvent(playerId, EventType.Movement));
            player.area = area;
            player.zone = this.room.findZoneByArea(area);
            player.update();
            console.log('the area race', area);
            DC.send(player.socket, Action.AreaEffect, area);
            return Promise.race([DC.waitFor(player.socket, Action.Skip), DC.waitFor(player.socket, Action.AreaEffect)])
                .then(message => message)
                .catch(() => new ServerMessage(Action.Skip, null));
        }).then(message => {
            console.log('area effect', message);
            DC.broadcast(roomName, Action.TurnStateChange, new TurnEvent(playerId, EventType.AreaEffect));
            if (message.action === Action.AreaEffect) {
                return this.resolveAreaEffect(player);
            }
        }).then(() => {
            DC.broadcast(roomName, Action.TurnStateChange, new TurnEvent(playerId, EventType.StartCombat));
            console.log('the combat race');
            DC.send(player.socket, Action.Attack, this.calculateAttackRange(player));
            return Promise.race([DC.waitFor(player.socket, Action.Skip), DC.waitFor(player.socket, Action.Attack)])
                .then(message => message)
                .catch(() => new ServerMessage(Action.Skip, null));
        }).then(message => {
            console.log('combat', message);
            DC.broadcast(roomName, Action.TurnStateChange, new TurnEvent(playerId, EventType.Combat));
            if (message.action === Action.AreaEffect) {
                return this.resolveCombat(player);
            }
        }).then(() => {
            console.log('end turn');
            DC.broadcast(roomName, Action.TurnStateChange, new TurnEvent(playerId, EventType.EndTurn));
        });

    }

    resolveAreaEffect(player:Client) {
        return null;
    }


    resolveCombat(player:Client) {
        return null;
    }

    calculateAttackRange(player:Client) {
        return null;
    }
    
    onTurnsFullLoop() {
        // apply effects
    }

    checkWinConditions() {
        return null;
    }


}