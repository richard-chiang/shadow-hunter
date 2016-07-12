import {Component, Input} from '@angular/core';
import {ZoneComponent} from './zone.component';
import {DomSanitizationService} from '@angular/platform-browser';

@Component({
    selector: 'dc-zone-set',
    templateUrl: 'app/zones/zone-set.component.html',
    styleUrls: ['app/zones/zone-set.component.css'],
    directives: [ZoneComponent]
})

export class ZoneSetComponent {
    private bottomLeftRotation;
    private bottomRightRotation;
    @Input() zoneSetArray:any[];


    constructor(sanitizer:DomSanitizationService) {
        this.bottomLeftRotation = sanitizer.bypassSecurityTrustStyle('rotate(60deg)');
        this.bottomRightRotation = sanitizer.bypassSecurityTrustStyle('rotate(-60deg)');
    }


}
