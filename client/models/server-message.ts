export enum Action {
    Info,
    Error,

    GameStateChange,
    PlayerStateChange,
    TurnStateChange,

    JoinGame,
    CreateGame,
    StartGame,


    DisplayCard,
    ChoosePlayer,
    SubmitChoice,
    Reveal,
    UseAbility,


    MoveToArea,
    Skip,
    AreaEffect,
    Attack,

}

export class ServerMessage {
    action:Action;
    data:any;

    constructor(action:Action, data:any) {
        this.action = action;
        this.data = data;
    }
}
