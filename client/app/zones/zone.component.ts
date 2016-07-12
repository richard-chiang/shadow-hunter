import {Component, Input} from '@angular/core';
import {AreaComponent} from './area.component';
@Component({
    selector: 'dc-zone',
    templateUrl: 'app/zones/zone.component.html',
    styleUrls: ['app/zones/zone.component.css'],
    directives: [AreaComponent]
})

export class ZoneComponent {
    @Input() zoneArray:any[];
}
