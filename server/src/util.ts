import * as _ from 'lodash';

let areaProbabilities = ["hermit", "hermit", "underworld", "underworld", "church", "any", "cemetery", "weird", "altar"];

export class Util{
    static rollD4() {
        return Math.floor(Math.random() * 4) + 1;
    }

    static rollD6() {
        return Math.floor(Math.random() * 6) + 1;
    }

    static randomArea(current?:string) {
        return _.first(_.shuffle(_.without(areaProbabilities, current)));
    }
    
 
}