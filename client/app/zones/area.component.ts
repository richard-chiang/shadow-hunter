import {Component, Input} from '@angular/core';
import {PlayerTokenComponent} from "../player/player-token.component";

@Component({
    selector: 'dc-area',
    templateUrl: 'app/zones/area.component.html',
    styleUrls: ['app/zones/area.component.css'],
    directives: [PlayerTokenComponent]
})

export class AreaComponent {
    @Input() areaObject:any;
}
