/**
 * Created by rc on 2016-05-14.
 */
import {Card, CardColor} from '../../../client/models/card';

export class BlackCard implements Card {
    name:string;
    description:string;
    color:CardColor = CardColor.Black;
}

export class WhiteCard implements Card {
    name:string;
    description:string;
    color:CardColor = CardColor.White;
}

export class GreenCard implements Card {
    name:string;
    description:string;
    color:CardColor = CardColor.Green;
}
