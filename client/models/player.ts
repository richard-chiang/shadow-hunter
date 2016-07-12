import {Area} from "./area";
import {Zone} from "./zone";
import {Card} from "./card";
import {Character} from "./character";

export interface Player {
    id:number;
    name:string;
    isRevealed:boolean;
    isAbilityUsed:boolean;
    damageTaken:number;
    area:string;
    zone: [string, string];
    equipment:Card[];
    character:Character;
    bonusDamage:number;
}
