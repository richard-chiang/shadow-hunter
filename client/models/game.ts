import {Player} from "./player";
import {Zone} from "./zone";
import {Card} from "./card";
import {Area} from "./area";

export enum GameStatus {
    Waiting,
    Started,
    Ended
}

export interface Game {
    status:GameStatus;
    owner:string;
    players:Player[];
    zones:[Area,Area][];
    discardedGreen:number;
    discardedWhite:Card[];
    discardedBlack:Card[];
}
