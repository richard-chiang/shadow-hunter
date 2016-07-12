import {WebSocket} from "ws";
import {Player} from "../../../client/models/player";
import {Card, CardColor} from "../../../client/models/card";
import {Character, Faction} from "../../../client/models/character";
import {Zone} from "../../../client/models/Zone";
import {Area} from "../../../client/models/Area";
import {DC} from "../server";
import {Action} from '../../../client/models/server-message';
import {Room} from "./room";
import {Util} from "../util";

export class Client implements Player {
    id:number = 0;
    isRevealed:boolean;
    isAbilityUsed:boolean;
    possibleTargets:Client[];
    area:string;
    zone:[string,string] = [null,null];
    equipment: Card[];
    character: Character;
    bonusDamage: number;
    bonusDefense:number;
    rolls: number; // dice number rolled
    targetsToAttack:Client[];
    damageTaken:number;


    constructor(public name:string, public room:string, public socket:WebSocket) {
        this.bonusDamage = 0;
        this.bonusDefense = 0;
    }

    init() {
        this.setDefaultTargets();
    }

    update() {
        DC.broadcast(this.room, Action.PlayerStateChange, this.view());
    }

    view() {
        let view:any = Object.assign({}, this);
        delete view.character;
        delete view.socket;
        return view;
    }

    removeEquipment(equip: Card){
        let index = this.equipment.indexOf(equip);
        if(index != -1){
            this.equipment.splice(index, 1);
        }
    }

    addEquipment(equip:Card){
        this.equipment.push(equip);
    }

    //@Param: card, the card the player receives or given by another player
    //@Param: id, the id of the player who gives the card. If none, pass in 0;
    //@Param: equipment: equipment card to give if the card applies
    //@Param: roll: number rolled for the card effect
    receiveCard(card:Card, id:number, equipment:string, roll:number){
        switch(card.color){
            case CardColor.Black:
                this.receiveBlackCard(card, id, equipment, roll);
                break;
            case CardColor.Green:
                this.receiveGreenCard(card, id, equipment, roll);
                break;
            case CardColor.White:
                this.receiveWhiteCard(card, id, equipment, roll);
                break;
            default:
                confirm("Sorry, that card does not have a valid color! Did someone cheated?");
        }
    }

    private receiveBlackCard(card:Card, id:number, equipment:string, roll:number){
        switch (card.name) {
            case "Banana Peel":
                if(this.equipment.length > 0){
                    this.giveAwayYourEquipment(id, equipment);
                }else{
                    this.damageTaken += 1;
                }
                break;
            case "Bloodthirsty Spider":
                this.damageTaken += 2;
                this.damageSomeone(id, 2);
                break;
            case "Butcher Knife":
                this.bonusDamage += 1;
                break;
            case "Chainsaw":
                this.bonusDamage += 1;
                break;
            case "Diabolic Ritual":
                if(this.isShadow()){
                    this.revealAndHeal();
                }
                break;
            case "Dynamite":
                this.dynamite();
                break;
            case "Handgun":
                this.handGun();
                break;
            case "Machine Gun":
                this.machineGun();
                break;
            case "Masamune":
                this.masamune(roll);
                break;
            case "Moody Goblin":
                this.stealCard(id,null);
                break;
            case "Rusted Broad Axe":
                this.bonusDamage += 1;
                break;
            case "Spiritual Doll":
                this.spiritualDoll(id);
                break;
            case "Vampire Bats":
                this.vampireBats(id);
                break;
            default:
                confirm("Sorry, that black card is not in the system yet!");
        }
    }

    private receiveWhiteCard(card: Card, id:number, equipment:string, roll: number){
        switch (card.name) {
            case "Advent":
                if(this.isHunter()){
                    this.revealAndHeal();
                }
                break;
            case "Blessing":
                this.healOtherForD6(id,roll);
                break;
            case "Chocolate":
                if(this.character.name === "Allie" ||
                    this.character.name === "Emi" ||
                    this.character.name === "Unknown"){

                    this.revealAndHeal();
                }
                break;
            case "Concealed Knowledge":
                this.continueNextTurn();
                break;
            case "Disenchant Mirror":
                let c = this.character.name;
                if(c === "Werewolf" || c === "Vampire"){
                    this.isRevealed = true;
                }
                break;
            case "First Aid":
                this.setToSeven(id);
                break;
            case "Flare of Judgement":
                this.hitAllOtherPlayers();
                break;
            case "Fortune Brooch":
                this.addEquipment(card);
                break;
            case "Guardian Angel":
                this.addEquipment(card);
                break;
            case "Holy Robe":
                this.oneLessDamageOneMoreDefense();
                break;
            case "Holy Water of Healing":
                this.damageTaken -= 2;
                break;
            case "Mystic Compass":
                this.rollTwice();
                break;
            case "Silver Rosary":
                this.killAward();
                break;
            case "Spear of Longinus":
                if(this.isHunter()){
                    this.revealForDamage();
                }
                break;
            case "Talisman":
                this.addEquipment(card);
                break;
            default:
                confirm("Sorry, that white card is not in the system yet!");
        }
    }

    private receiveGreenCard(card: Card, id:number, equipment:string, roll:number){
        switch (card.name) {
            case "Aid":
                if(this.isHunter()){
                    this.healOrDamage();
                }
                break;
            case "Anger":
                if(this.isHunter() || this.isShadow()){
                    this.giveEquipmentOrTakeOneDamage(id);
                }
                break;
            case "Blackmail":
                if(this.isHunter() || this.isNeutral()){
                    this.giveEquipmentOrTakeOneDamage(id);
                }
                break;
            case "Bully":
                if(this.character.totalHealth <= 11){
                    this.damageTaken += 1;
                }
                break;
            case "Exorcism":
                if(this.isShadow()){
                    this.damageTaken += 2;
                }
                break;
            case "Greed":
                if(this.isNeutral() || this.isShadow()){
                    this.giveEquipmentOrTakeOneDamage(id);
                }
                break;
            case "Huddle":
                if(this.isShadow()){
                    this.healOrDamage();
                }
                break;
            case "Nurturance":
                if(this.isNeutral()){
                    this.healOrDamage();
                }
                break;
            case "Predicition":
                this.showCardToCurrentPlayerOnly(id);
                break;
            case "Slap":
                if(this.isHunter()){
                    this.damageTaken += 1;
                }
                break;
            case "Spell":
                if(this.isShadow()){
                    this.damageTaken += 1;
                }
                break;
            case "Tough Lesson":
                if(this.character.totalHealth >= 12){
                    this.damageTaken += 2;
                }
                break;
            default:
                confirm("Sorry, that green card is not in the system yet!");
        }
    }

    private isHunter(){
        return this.character.faction === Faction.Hunter;
    }

    private isShadow(){
        return this.character.faction === Faction.Shadow;
    }

    private isNeutral(){
        return this.character.faction === Faction.Neutral;
    }

    //heal 1 damage (if you have none take 1 damage)
    private healOrDamage(){
        if(this.damageTaken > 0){
            this.damageTaken -= 1;
        } else {
            this.damageTaken = 1;
        }
    }

    //give 1 equipment to current player or take 1 damage
    private giveEquipmentOrTakeOneDamage(id:number){
        
        return 0;
    }

    private showCardToCurrentPlayerOnly(id:number){
        let currentPlayer = this.getPlayer(id);
        
    return 0;
}

    // can choose to reveal your identity and fully heal yourself
    private revealAndHeal(){
        this.isRevealed = true;
        this.damageTaken = 0;
}

    // Pick a player character other than yourself and they heal D6 damage
    private healOtherForD6(id:number, heal:number){
        this.getPlayer(id).getPlayer(id).damageTaken -= heal;
    }

    // continues after this turn, current player gets to play twice including this current one
    private continueNextTurn(){

    }

    // Set the damage marker of any player's character to 7
    private setToSeven(id:number) {
        this.damageSomeone(id, 7);
    }

    //All OTHER characters take 2 points of damage
    private hitAllOtherPlayers(){
        let otherPlayers:Client[] = this.getRoom().players.filter(player => player.id !== this.id);
        for(var player of otherPlayers){
            player.damageTaken += 2;
        }
    }

    private oneLessDamageOneMoreDefense(){
        this.bonusDamage -= 1;
        this.bonusDefense += 1;
    }

/// /you may roll twice for movement and choose which result to use
    private rollTwice(){

    }

    // If your attack kills another character you get all their equipment
    private killAward(){

    }

    // if you are already revealed or you can choose to reveal for 2 extra damage
    private revealForDamage(){
        this.isRevealed = true;
        this.bonusDamage += 2;
    }

    //give an equipment to another character
    private giveAwayYourEquipment(player_id:number, equip_name:string){
        let equipmentCard = this.equipment.find(e => e.name === equip_name);
        this.getPlayer(player_id).addEquipment(equipmentCard);
        this.removeEquipment(equipmentCard);
    }
    // damage someone
    private damageSomeone(id:number, damage:number){
        this.getPlayer(id).damageTaken += damage;
    }

    //Roll the 2 dice and give 3 points of damage to all characters in the location designated by the total number rolled (nothing happens on a 7)
    private dynamite(){
        let randomArea = Util.randomArea();
        if(randomArea !== "any"){
            let zone = this.getRoom().findZoneByArea(randomArea);
            let targetedPlayers = this.getRoom().players.filter(player => player.zone[0] === zone[0]);
            targetedPlayers.forEach(target => target.damageTaken += 3);
            //add condition for talisman
        }
    }

    //Your attack range becomes every Zone but your own
    private handGun(){
        this.possibleTargets = this.getRoom().players.filter(player =>
        player.area !== this.zone[0] && player.area !== this.zone[1]);
    }

    //Your attacks target all characters within your attack range (roll the dice once and apply the same damage to all affected characters)
    private machineGun(){
        this.targetsToAttack = this.possibleTargets;
    }

    //You MUST attack if possible. Your attacks are executed by a single roll of the 4-sided die (you cannot fail).
    private masamune(damage:number){
        this.possibleTargets.forEach(target => target.damageTaken += (this.bonusDamage + damage));
    }

    //You steal an equipment card from any character.
    private stealCard(player_id:number, equip_name:string){
        let equipmentCard = this.getPlayer(player_id).equipment.find(e => e.name === equip_name);
        this.getPlayer(player_id).removeEquipment(equipmentCard);
        this.addEquipment(equipmentCard);
    }

    // pick a character, roll 6-sided die
    // if roll is 1-4, deal 3 damage
    // if roll is 5-6, receive 3 damage
    private spiritualDoll(id:number){
        if(this.rolls < 5){
            this.damageSomeone(id, 3);
        }else{
            this.damageTaken += 3;
        }
    }

    // deal two damage to any character and heal 1 point yourself
    private vampireBats(id:number){
        this.damageSomeone(id, 2);
        this.damageTaken -= 1;
    }

    // returns player based on id
    private getPlayer(id:number){
        let players = this.getRoom().players;
        return players.find(player => player.id === id);
    }

    private getRoom(){
        return DC.rooms[this.room];
    }

    private setDefaultTargets() {
        this.possibleTargets = this.getRoom().players.filter(player =>
        player.area === this.zone[0] || player.area === this.zone[1]);
    }


}


// How to damage someone
// How to get dice result
// How to choose whether to do an action/ give an equipment