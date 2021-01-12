import { Injectable } from '@angular/core';
import {Calculation} from './model/Calculation';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient) { }

  calculate(calculation: Calculation): any {
    this.http.post('http://localhost:8080/calculator', calculation).subscribe(() => console.log('calculated'));
    return this.request().subscribe();
  }

  request(): any {
    return this.http.get('http://localhost:8080/calculator');
  }
}
