import {Component,Input, OnInit} from '@angular/core';
import {PlayerTokenComponent} from "./player-token.component";
import {PlayerListItem} from "../../models/player-list-item";

@Component({
  selector:'dc-player-list-item',
  template:'<div class="player-list__item" [ngClass]="{active: playerListItemObject.isTurn}" ><dc-player-token [playerId]="playerListItemObject.id"></dc-player-token><p class="player-list__item__name">{{playerListItemObject.name}}</p></div>',
  styleUrls:['app/player/player-list-item.component.css'],
  directives:[PlayerTokenComponent]
})

export class PlayerListItemComponent implements OnInit{
    @Input() playerListItemObject:PlayerListItem;

    ngOnInit(){

    }
}
