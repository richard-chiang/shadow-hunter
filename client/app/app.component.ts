import {Component, OnDestroy} from '@angular/core';
import {JoinGameComponent} from "./join-game/join-game.component";
import {SessionService} from "./session.service";
import {Subscription} from "rxjs/Subscription";
import {GameStatus, Game} from "../models/game";

import {BoardComponent} from './board/board.component';

@Component({
    selector: 'dc-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [JoinGameComponent, BoardComponent],
    providers: [SessionService]
})
export class AppComponent implements OnDestroy {

    isInGame:boolean = false;
    gameStatus:GameStatus;
    gameSubscription:Subscription;

    constructor(private sessionService:SessionService) {
        this.gameSubscription = sessionService.gameStateChanged$.subscribe(
            (game:Game) => {
                this.gameStatus = game.status;
                this.isInGame = true;
            });
    }

    ngOnDestroy() {
        this.gameSubscription.unsubscribe();
    }
}
