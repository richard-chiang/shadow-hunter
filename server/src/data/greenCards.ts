/**
 * Created by rc on 2016-05-14.
 */
import {GreenCard} from "./cards";

export class Aid extends GreenCard{
    name= "Aid";
    description="Hunter heal 1 damage (if you have none take 1 damage)";
}

export class Anger extends GreenCard{
    name= "Anger";
    description="Hunter or Shadow - give 1 equipment to current player or take 1 damage";
}

export class Blackmail extends GreenCard{
    name= "Blackmail";
    description="Hunter or Neutral - give 1 equipment to current player or take 1 damage";
}

export class Bully extends GreenCard{
    name= "Bully";
    description="HP less or equal 11 (A,B,C,E,U) take 1 damage";
}

export class Exorcism extends GreenCard{
    name= "Exorcism";
    description="Shadow - take 2 damage";
}

export class Greed extends GreenCard{
    name= "Greed";
    description="Neutral or Shadow - give 1 equipment to current player or take 1 damage";
}

export class Huddle extends GreenCard{
    name= "Huddle";
    description="Shadow heal 1 damage (if you have none take 1 damage)";
}

export class Nurturance extends GreenCard{
    name= "Nurturance";
    description="Neutral heal 1 damage (if you have none take 1 damage)";
}

export class Prediction extends GreenCard{
    name= "Predicition";
    description="Show your character card to current player";
}

export class Slap extends GreenCard{
    name= "Slap";
    description="Hunter - take 1 damage";
}

export class Spell extends GreenCard{
    name= "Spell";
    description="Shadow - take 1 damage";
}

export class ToughLesson extends GreenCard{
    name= "Tough Lesson";
    description="HP greater or equal 12 (D,F,G,V,W) take 2 damage";
}