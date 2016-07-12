/**
 * Created by rc on 2016-05-14.
 */
import {BlackCard} from "./cards";

export class BananaPeel extends BlackCard
{
    name= "Banana Peel";
    description= "Give one of your equipment cards to another character. If you have no equipment cards you receive 1 point of damage.";
}

export class BloodthirstySpider extends BlackCard
{
    name= "Bloodthirsty Spider";
    description= "You give 2 points of damage to any character and receive 2 points of damage yourself.";
}

export class ButcherKnife extends BlackCard
{
    name= "Butcher Knife";
    description= "On a successful attack you give 1 point of extra damage.";
}

export class Chainsaw extends BlackCard
{
    name= "Chainsaw";
    description= "On a successful attack you give 1 point of extra damage.";
}

export class DiabolicRitual extends BlackCard
{
    name= "Diabolic Ritual";
    description= "If you are a Shadow you may reveal your identity. If you do your damage points are reset to 0.";
}

export class Dynamite extends BlackCard
{
    name= "Dynamite";
    description= "Roll the 2 dice and give 3 points of damage to all characters in the location designated by the total number rolled (nothing happens on a 7).";
}

export class Handgun extends BlackCard
{
    name= "Handgun";
    description= "Your attack range becomes every Area but your own.";
}

export class MachineGun extends BlackCard
{
    name= "Machine Gun";
    description= "Your attacks target all characters within your attack range (roll the dice once and apply the same damage to all affected characters).";
}

export class Masamune extends BlackCard
{
    name= "Masamune";
    description=  "You MUST attack if possible. Your attacks are executed by a single roll of the 4-sided die (you cannot fail).";
}

export class MoodyGoblin extends BlackCard
{
    name= "Moody Goblin";
    description=  "You steal an equipment card from any character.";
}

export class RustedBroadAxe extends BlackCard
{
    name= "Rusted Broad Axe";
    description=  "On a successful attack you deal 1 point of extra damage.";
}

export class SpiritualDoll extends BlackCard
{
    name= "Spiritual Doll";
    description=  "Pick any character and roll a 6-sided die. If the die roll is 1 to 4 you deal 3 points of damage to that character. If the die roll is 5 or 6 you receive 3 points of damage";
}

export class VampireBats extends BlackCard
{
    name= "Vampire Bats";
    description=  "You deal 2 points of damage to any character and heal 1 point of your own damage.";
}