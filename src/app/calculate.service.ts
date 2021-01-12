import { Injectable } from '@angular/core';
import {Calculation} from './model/Calculation';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor(private http: HttpClient) { }

  calculate(calculation: Calculation): Observable<any> {
    return this.http.post('http://localhost:8080/calculator', calculation, { observe: 'response' });
  }

  request(): Observable<any> {
    return this.http.get('http://localhost:8080/calculator');
  }
}
