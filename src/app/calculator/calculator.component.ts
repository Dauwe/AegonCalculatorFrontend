import { Component, OnInit } from '@angular/core';
import {Calculation} from '../model/Calculation';
import {CalculateService} from '../calculate.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private calculateService: CalculateService) { }
  numberOne: number | undefined;
  numberTwo: number | undefined;
  method: string | undefined;

  numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  methods = ['+', '-', '*', '/'];
  calculation: Calculation = {};
  calculations: [Calculation] | undefined;

  ngOnInit(): void {
  }

  numberClicked(num: number): any {
    if (this.numberOne === undefined){
      this.numberOne = num;
      this.calculation.numberOne = num;
      return;
    }
    if (this.numberTwo === undefined){
      this.numberTwo = num;
      this.calculation.numberTwo = num;
      return;
    }
  }

  methodClicked(met: string): any {
    if (this.method === undefined){
      this.method = met;
      switch (met) {
        case '+': {
          this.calculation.method = 'ADD';
          break;
        }
        case '-': {
          this.calculation.method = 'SUBTRACT';
          break;
        }
        case '*': {
          this.calculation.method = 'MULTIPLY';
          break;
        }
        case '/': {
          this.calculation.method = 'DIVIDE';
        }
      }
      return;
    }
  }

  calculate(calculation: Calculation): any{
    this.calculateService.calculate(calculation).subscribe(() =>
      this.calculateService.request().subscribe((x: any) => this.calculations = x), () => window.alert('ERROR. Probeer het opnieuw.'));
  }


  clear(): any {
    this.numberTwo = undefined;
    this.numberOne = undefined;
    this.method = undefined;
  }
}
