import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CalculateService} from '../calculate.service';
import {Observable} from 'rxjs';
import {Calculation} from '../model/Calculation';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let httpMock: HttpTestingController;
  let mockCalculateService: CalculateService;

  beforeEach(async () => {
    mockCalculateService = jasmine.createSpyObj('calculateService', {
      request: [{ numberOne: 1, numberTwo: 2, method: 'ADD', result: 3}],
      calculate : new Observable<any>()
    });

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CalculatorComponent ],
      providers: [
        { provide: CalculateService, useValue: mockCalculateService }
      ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set numberOne of the calculation after pressing a calculation method', () => {
    expect(component.numberOne).toEqual('');
    component.numberClicked('1');
    component.numberClicked('2');

    component.methodClicked('+');
    expect(component.numberOne).toEqual('12');
    expect(component.calculation.numberOne).toEqual(12);
  });

  it('should set numberTwo of the calculation after pressing the = button', () => {
    component.numberClicked('3');
    component.methodClicked('+');

    expect(component.numberTwo).toEqual('');
    component.numberClicked('1');
    component.numberClicked('2');

    component.calculate(component.calculation);
    expect(component.numberTwo).toEqual('12');
    expect(component.calculation.numberTwo).toEqual(12);
  });

  it('should calculate a calculation', () => {
    const calculation: Calculation = {numberOne: 1, numberTwo: 2, method: 'ADD'};

    component.calculate(calculation);
    expect(mockCalculateService.calculate).toHaveBeenCalledWith(calculation);
  });

  it('should throw an error when dividing by zero', () => {
    mockCalculateService.calculate = jasmine.createSpy().and.throwError('ERROR. Probeer een andere berekening.');
    const calculation: Calculation = {numberOne: 1, numberTwo: 0, method: 'ADD'};

    expect(() => {component.calculate(calculation); }).toThrow(new Error('ERROR. Probeer een andere berekening.'));
  });
});
