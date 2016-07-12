import {Card} from "./card";

export interface PlayerListItem {
    id:number;
    name:string;
    isRevealed:boolean;
    equipment:Card[];
    isTurn:boolean;
}
