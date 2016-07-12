export enum Faction {
    Neutral,
    Hunter,
    Shadow
}

export interface Character {
    name:string;
    faction:Faction;
    ability:string;
    winCondition:string;
    totalHealth:number;
}
