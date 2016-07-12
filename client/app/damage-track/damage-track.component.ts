import {Component, Input, OnChanges} from '@angular/core';
import {DamageTrackSpaceComponent} from './damage-track-space.component';

@Component({
    selector: 'dc-damage-track',
    templateUrl: 'app/damage-track/damage-track.component.html',
    styleUrls: ['app/damage-track/damage-track.component.css'],
    directives: [DamageTrackSpaceComponent]
})

export class DamageTrackComponent implements OnChanges{
    @Input() playerDamageArray:any[];
    damageLevelsLeftLane:any[];
    damageLevelsRightLane:any[];

    ngOnChanges():void {
        let tempPlayerDamageArray = this.playerDamageArray;
        this.damageLevelsLeftLane = tempPlayerDamageArray.splice(0, 10);
        this.damageLevelsRightLane = tempPlayerDamageArray;
    }
}
