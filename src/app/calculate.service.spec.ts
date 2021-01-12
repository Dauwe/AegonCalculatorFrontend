import { TestBed } from '@angular/core/testing';

import { CalculateService } from './calculate.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CalculateService', () => {
  let service: CalculateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(CalculateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to request calculations', () => {
    service.request().subscribe();
    const http = httpMock.expectOne('http://localhost:8080/calculator');

    expect(http.request.method).toBe('GET');
  });
});
