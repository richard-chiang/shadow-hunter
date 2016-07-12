import {Component, OnDestroy} from '@angular/core';
import {PlayerListItemComponent} from "./player-list-item.component";
import {Player} from "../../models/player";
import {PlayerListItem} from "../../models/player-list-item";
import {SessionService} from "../session.service";
import {Subscription} from "rxjs/Subscription";
import {TurnEvent, EventType} from "../../models/turnevent";

@Component({
  selector:'dc-player-list',
  templateUrl:'app/player/player-list.component.html',
  styleUrls:['app/player/player-list.component.css'],
  directives:[PlayerListItemComponent]
})

export class PlayerListComponent implements OnDestroy{
    playerSubscription:Subscription;
    turnsSubscription:Subscription;
    playerArray:PlayerListItem[] = [];

    constructor(private sessionService:SessionService) {
        this.playerSubscription = sessionService.playerJoined$.subscribe(
            (player:Player) => {
                let tempPlayerListItem:PlayerListItem = {
                    id:player.id,
                    name:player.name,
                    isRevealed:player.isRevealed,
                    equipment:player.equipment,
                    isTurn:false,
                };

                this.playerArray.push(tempPlayerListItem);
            });
        this.turnsSubscription = sessionService.turnStateChanged$.subscribe(
            (state:TurnEvent) => {
                if (state.type === EventType.StartTurn) {
                    this.playerArray.forEach(p => {
                        p.isTurn = p.id === state.playerId;
                    });
                }
            }
        );
    }
    ngOnDestroy() {
        this.playerSubscription.unsubscribe();
        this.turnsSubscription.unsubscribe();
    }
}
