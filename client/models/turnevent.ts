export enum EventType {
    StartTurn,
    Movement,
    AreaEffect,
    StartCombat,
    Combat,
    EndTurn,
}

export class TurnEvent {
    playerId:number;
    type:EventType;

    constructor(playerId:number, type:EventType) {
        this.playerId = playerId;
        this.type = type;
    }
}
