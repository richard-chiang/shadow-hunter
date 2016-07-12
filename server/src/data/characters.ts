/**
 * Created by rc on 2016-05-14.
 */
import {Character, Faction} from '../../../client/models/character';

export class Allie implements Character{
    name = "Allie";
    faction = Faction.Neutral;
    ability = "Mother's Love";
    winCondition = "survive";
    totalHealth = 8;
}

export class Bob implements Character{
    name = "Bob";
    faction = Faction.Neutral;
    ability = "Robbery";
    winCondition = "5xequipment";
    totalHealth = 10;
}

export class Catherine implements Character{
    name = "Catherine";
    faction= Faction.Neutral;
    ability= "Stigmata";
    winCondition = "dieFirstOrSurvive";
    totalHealth = 11;
}

export class Daniel implements Character{
    name= "Daniel";
    faction= Faction.Neutral;
    ability= "Scream";
    winCondition= "dieFirstOrHuntersWin";
    totalHealth= 13;
}

export class Ellen implements Character{
    name =  "Ellen";
    faction =  Faction.Hunter;
    ability =  "Chain of Forbidden Curse";
    winCondition =  "hunter";
    totalHealth =  10;
}

export class Franklin implements Character{
    name =  "Franklin";
    faction =  Faction.Hunter;
    ability =  "Lightning";
    winCondition =  "hunter";
    totalHealth =  12;
}

export class George implements Character{
    name =  "George";
    faction =  Faction.Hunter;
    ability =  "Demolish";
    winCondition =  "hunter";
    totalHealth =  14;
}

export class Unknown implements Character{
    name =  "Unknown";
    faction =  Faction.Shadow;
    ability =  "Deceit";
    winCondition =  "shadow";
    totalHealth =  11;
}

export class Vampire implements Character{
    name =  "Vampire";
    faction =  Faction.Shadow;
    ability =  "Suck blood";
    winCondition =  "shadow";
    totalHealth =  13;
}

export class Wight implements Character{
    name =  "Wight";
    faction =  Faction.Shadow;
    ability =  "Multiplication";
    winCondition =  "shadow";
    totalHealth =  14;
}