import * as _ from 'lodash';

export class TurnLoop {
    public turnList:number[];
    public currentPlayer:number;
    private turnIndex:number = -1;
    private extraTurns:any = {};
    private isExtraTurn:boolean = false;

    constructor(playerList:number[], public onFullLoop?:Function) {
        this.turnList = playerList;
    }

    setExtraTurns(playerId:number, number:number) {
        this.extraTurns[playerId] = number;
    }

    nextTurn() {
        var currentPlayerId = this.turnList[this.turnIndex];
        if (this.isExtraTurn) {
            if (--this.extraTurns[currentPlayerId] <= 0) {
                this.turnIndex++;
                this.isExtraTurn = false;
            }
        } else if (this.extraTurns[currentPlayerId]) {
            this.isExtraTurn = true;
        } else  {
            this.turnIndex++;
        }
        if (this.turnIndex >= this.turnList.length) {
            this.turnIndex = 0;
            this.extraTurns = {};
            this.isExtraTurn = false;

            // Full Loop
            if(this.onFullLoop){
                this.onFullLoop();
            }
        }
        this.currentPlayer = this.turnList[this.turnIndex];
        return this.currentPlayer;
    }

    dropPlayer(playerId:number) {
        this.turnList = _.without(this.turnList, playerId);
    }

    addPlayer(playerId:number) {
        this.turnList.push(playerId);
    }
}