import {Component} from '@angular/core';
import {SessionService} from "../session.service";


@Component({
    selector: 'dc-join-game',
    templateUrl: 'app/join-game/join-game.component.html',
    styleUrls: ['app/join-game/join-game.component.css']
})
export class JoinGameComponent {
    errorMessage:string;

    constructor(private sessionService:SessionService) {
        (<any>window).testClient = this;
    }

    joinGame(room:string, player:string) {
        this.sessionService.join(room, player);
        this.errorMessage = "Could not join. Is the room created?";
    }

    createGame(room:string, player:string) {
        this.sessionService.create(room, player);
        this.errorMessage = "Could not create room. Room name in use.";
    }
}
