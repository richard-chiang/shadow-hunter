import {Component,Input} from '@angular/core';
import {PlayerActionOptionComponent} from "./player-action-option.component";

@Component({
    selector:'dc-player-action-group',
    templateUrl:'app/player/player-action-group.component.html',
    styleUrls:['app/player/player-action-group.component.css'],
    directives:[PlayerActionOptionComponent]
})

export class PlayerActionGroupComponent{
    @Input() playerActions:any[];

    doAction(action):void{
        console.log(action);
    }
}
