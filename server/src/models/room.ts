import {Game, GameStatus} from "../../../client/models/game";
import {Client} from "./client";
import {DC} from "../server";
import {Action} from '../../../client/models/server-message';
import {Area} from '../../../client/models/area';
import {Card} from '../../../client/models/card';
import * as Areas from '../data/areas';
import * as _ from 'lodash';
import {GameLoop} from "../gameloop";

interface Map<T> {
    [K:string]:T;
}

export class Room implements Game {
    status:GameStatus;
    zones:[Area,Area][] = [];
    discardedGreen: number;
    discardedWhite: Card[];
    discardedBlack: Card[];
    playersById: Map<Client> = {};
    playersAsIds: number[];
    gameLoop:GameLoop;
    constructor(public name:string, public owner:string, public players:Client[]) {
    }

    create() {
        this.status = GameStatus.Waiting;

        this.seedZones();
    }

    start() {
        this.seedPlayers();
        this.status = GameStatus.Started;
        
        this.gameLoop = new GameLoop(this);
    }

    seedZones() {
        let results:Area[] = _.shuffle([new Areas.Cemetery(),
            new Areas.Church(),
            new Areas.ErstwhileAltar(),
            new Areas.HermitsCabin(),
            new Areas.UnderworldGate(),
            new Areas.WeirdWoods()]);
        console.log(results);
        this.zones.push([results[0], results[1]]);
        this.zones.push([results[2], results[3]]);
        this.zones.push([results[4], results[5]]);
    }

    findZoneByArea(area:string):[string, string] {
        let zone = this.zones.find((zone:[Area,Area]) => {
            return zone[0].id === area || zone[1].id === area;
        });
        return [zone[0].id, zone[1].id];
    }

    seedPlayers() {
        this.playersAsIds = _.map(this.players, p => {
            p.init();
            this.playersById[p.id] = p;
            return p.id;
        });
    }
    
    transferEquipment(item:string, from:number, to:number){
        
    }

    update() {
        DC.broadcast(this.name, Action.GameStateChange, this.view());

        this.players.forEach(player => {
            player.update();
        });
    }

    view() {
        let view:any = Object.assign({}, this);
        delete view.players;
        return view;
    }
    
}
