/**
 * Created by rc on 2016-05-14.
 */
import {Component, Input} from '@angular/core';

@Component({
  selector:'dc-dicer',
  templateUrl: 'app/dicer/dicer.component.html',
  styleUrls: ['app/dicer/dicer.component.css']
})
export class DicerComponent{
  // input the maximum number of each dice
  @Input('first-dice') maxOne:number;
  @Input('second-dice') maxTwo:number;

  diceResult: number;

  constructor(){
    this.diceResult = 2;
  }

  generate(){
      var numOne, numTwo;
      if(this.maxOne > 0){
          numOne = this.getRandomInt(this.maxOne);
      }
      if(this.maxTwo > 0){
          numTwo = this.getRandomInt(this.maxTwo);
      }
    this.diceResult = numOne + numTwo;
  }

  getRandomInt(max) {
      return Math.floor(Math.random() * max + 1);
  }
}


