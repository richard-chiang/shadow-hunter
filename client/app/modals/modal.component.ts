import {Component, Input, OnInit} from '@angular/core';
import {ModalData} from "../../models/modal-data";
import {PlayerActionGroupComponent} from "../player/player-action-group.component";

@Component({
    selector:'dc-modal',
    templateUrl:'app/modals/modal.component.html',
    styleUrls:['app/modals/modal.component.css'],
    directives:[PlayerActionGroupComponent]

})

export class ModalComponent implements OnInit{
   @Input() data:ModalData;
    title:string;
    description:string;
    actionsArray:any[];
    @Input() modalShow:boolean=false;
    ngOnInit(){
        this.title = this.data.title;
        this.description = this.data.description;
        this.actionsArray = this.data.actionsArray;
    };

}
