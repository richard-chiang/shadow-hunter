import {Component, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {DamageTrackComponent} from '../damage-track/damage-track.component';
import {ZoneSetComponent} from '../zones/zone-set.component';
import * as _ from 'lodash';
import {Subscription} from "rxjs/Subscription";
import {SessionService} from "../session.service";
import {GameStatus, Game} from "../../models/game";
import {Player} from "../../models/player";
import {DicerComponent} from '../dicer/dicer.component';
import {PlayerListComponent} from "../player/player-list.component";
import {PlayerActionGroupComponent} from "../player/player-action-group.component";
import {ServerMessage, Action} from "../../models/server-message";
import {ModalComponent} from "../modals/modal.component";
import {ModalData} from "../../models/modal-data";

@Component({
  selector: 'dc-board',
  templateUrl:'app/board/board.component.html',
  styleUrls:['app/board/board.component.css'],
  directives:[DamageTrackComponent,ZoneSetComponent, DicerComponent, PlayerListComponent, PlayerActionGroupComponent, ModalComponent]
})
export class BoardComponent implements OnDestroy {

    zoneSetArray:any[];

    playerDamageArray:any[] = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    gameSubscription:Subscription;
    playerSubscription:Subscription;
    actionSubscription:Subscription;

    sessionServiceRef:SessionService;
    newArea:string;

    showMovementModal:boolean = false;
    movementModalData:ModalData = {
        title:"Select Area",
        description:"You rolled a seven! Select the area you would like to move to.",
        actionsArray:[
            {
                name:"Hermit's Hut",
                action:_.bind(this.moveTo,this)
            },
            {
                name:"Church",
                action:_.bind(this.moveTo,this)
            },
            {
                name: "Cemetery",
                action: _.bind(this.moveTo, this)
            },
            {
                name:"Weird Woods",
                action:_.bind(this.moveTo,this)
            },
            {
                name:"Erstwhile Altar",
                action:_.bind(this.moveTo,this)
            },            {
                name:"Underworld Gate",
                action:_.bind(this.moveTo,this)
            }
        ]
    };

    playerActions:any[]= [
        {
            name:'move',
            action:_.bind(this.move, this)
        },
        {
            name:'reveal',
            action:this.doAction
        },
        {
            name:'area effect',
            action:_.bind(this.doAreaEffect, this)
        },
        {
            name:'skip',
            action:_.bind(this.doSkip, this)
        },
        {
            name:'attack',
            action:this.doAction
        },
        {
            name:'use ability',
            action:this.doAction
        },
        {
            name:'start game',
            action:_.bind(this.startGame, this)
        },
    ];

    constructor(private sessionService:SessionService, private cd:ChangeDetectorRef) {
        this.sessionServiceRef = sessionService;
        this.gameSubscription = sessionService.gameStateChanged$.subscribe(
            (game:Game) => {
                if (!this.zoneSetArray) {
                    this.zoneSetArray = game.zones;
                }
            });

        this.playerSubscription = sessionService.playerStateChanged$.subscribe(
            (player:Player) => {
                if (player.area) {
                    this.setPlayerZone(player.id, player.area);
                    //cd.markForCheck();
                }
            });
        this.actionSubscription = sessionService.actionEvent$.subscribe(
            (message:ServerMessage) =>{
                console.log(message);
                if(message.action===Action.MoveToArea){
                    this.newArea = message.data;
                }
            }
        );
    }

    ngOnDestroy() {
        this.gameSubscription.unsubscribe();
        this.playerSubscription.unsubscribe();
    }

    doAction(action):void {
        console.log(action);
    }

    clearPlayerZone(player:number) {
        this.zoneSetArray.forEach(zone => {
            zone.forEach(area => {
                area.players = _.without(area.players, player);
            });
        });
    }

    setPlayerZone(player:number, desiredArea:string) {
        this.clearPlayerZone(player);
        this.zoneSetArray.forEach(zone => {
            zone.forEach(area => {
                if (area.id === desiredArea) {
                    area.players.push(player);
                }
            });
        });
    }

    startGame():void{
        this.sessionServiceRef.start();
    }

    doAreaEffect():void{
        this.sessionServiceRef.send(Action.AreaEffect, null);
    }

    doSkip() {
        this.sessionServiceRef.send(Action.Skip, null);
    }

    move():void{
        if(this.newArea==='any'){
            console.log("choose an area!");
            this.showMovementModal = true;
            this.newArea = null;
        }else{
            this.sessionServiceRef.send(Action.MoveToArea, null);
        }
    }
    moveTo(location):void{
        let area;
        switch(location){
            case "Hermit's Hut":
                area='hermit';
                break;
            case "Church":
                area='church';
                break;
            case "Cemetery":
                area='cemetery';
                break;
            case "Weird Woods":
                area='weird';
                break;
            case "Erstwhile Altar":
                area='altar';
                break;
            case "Underworld Gate":
                area='gate';
                break;
        }
        this.showMovementModal = false;
        this.sessionServiceRef.send(Action.MoveToArea, area);
    }


    skipAction():void{

    }
}
