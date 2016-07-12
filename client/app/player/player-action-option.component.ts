/**
 * Created by Michael Hofer on 5/15/2016.
 */

import {Component, Input} from '@angular/core';

@Component({
    selector: 'dc-player-action-option',
    template:'<div class="player-action-group__option" (click)="action(optionName)">{{optionName}}</div>',
    styleUrls:['app/player/player-action-option.component.css']
})

export class PlayerActionOptionComponent{
    @Input() optionName:string;
    @Input() action:any;
}
