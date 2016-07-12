import {Component, Input} from '@angular/core';
import {PlayerTokenComponent} from "../player/player-token.component";

@Component({
    selector: 'dc-damage-space',
    template: `<div class = "damage-track__space">
              <div class="damage-track__number-wrapper">{{damageLevel}}</div>
              <div class="damage-track__token-wrapper"><dc-player-token *ngFor="let player of playerArray" [playerId]="player"></dc-player-token></div>
            </div>`,
    styleUrls: ['app/damage-track/damage-track-space.component.css'],
    directives: [PlayerTokenComponent]
})

export class DamageTrackSpaceComponent {
    @Input() damageLevel:number;
    @Input() playerArray:number[];
}
