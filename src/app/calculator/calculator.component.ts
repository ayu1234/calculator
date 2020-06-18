import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  number:any = [9, 8, 7, 6, 5, 4, 3, 2, 1, '/', 0, '*'];
  operatorValues = ['+', '-', '=', 'clr']
  tempArray = [];
  completeArray:any=[0];
  currentNum;
  operator: any = {
    '+': (a,b) => a+b,
    '-': (a,b) => a-b,
    '*': (a,b) => a*b,
    '/': (a,b) => a/b,
    '=': () => {
      const tempVal = this.completeArray[0];
      this.completeArray.splice(0, this.completeArray.length);
      this.completeArray.push(tempVal);
    },
    'clr': () => {
      this.completeArray.splice(0, this.completeArray.length);
      this.currentNum=0;
      this.tempArray.splice(0, this.tempArray.length);
      this.completeArray.push(0);
    }
  };
  constructor() { }

  ngOnInit() {
  }

  addValue(value) {
    if (typeof value == 'string') {    
      if (this.completeArray[1] !== '=' && value !== 'clr') {
        this.currentNum=0;
        this.completeArray.push(value);
        if(this.completeArray.length == 4){
          this.completeArray[0] = this.operator[this.completeArray[1]](Number(this.completeArray[0]) , Number(this.completeArray[2]));
          this.completeArray.splice(1, this.completeArray.length-2);
        }
        this.tempArray.splice(0, this.tempArray.length);
      } else {
        this.operator[value]();
      }     
    } else if(typeof value == 'number') {
      this.tempArray.push(value);
      this.currentNum = Number(this.tempArray.join(''));
      this.completeArray.length < 2 ? (this.completeArray[0]=this.currentNum) : (this.completeArray[2]=this.currentNum);
      }
    }
}
