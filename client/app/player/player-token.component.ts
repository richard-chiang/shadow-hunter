import {Component, Input} from '@angular/core';

@Component({
    selector: 'dc-player-token',
    templateUrl: 'app/player/player-token.component.html',
    styleUrls: ['app/player/player-token.component.css']
})

export class PlayerTokenComponent {
    @Input() playerId:number;
    @Input() inArea:boolean=false;
    playerColor:string;

    getPlayerColor():string {
        console.log("fetching color");
        switch (this.playerId) {
            case 0:
                this.playerColor = 'yellow';
                break;
            case 1:
                this.playerColor = 'blue';
                break;
            case 2:
                this.playerColor = 'green';
                break;
            case 3:
                this.playerColor = 'pink';
                break;
            case 4:
                this.playerColor = 'purple';
                break;
            case 5:
                this.playerColor = 'red';
                break;
            case 6:
                this.playerColor = 'white';
                break;
            case 7:
                this.playerColor = 'grey';
                break;
        }
        return this.playerColor;
    }
}
