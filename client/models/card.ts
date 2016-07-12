export enum CardColor {
    Green,
    White,
    Black
}

export interface Card {
    name:string;
    description:string;
    color:CardColor;
}
