/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SchoolYearService } from './school-year.service';

describe('Service: SchoolYear', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolYearService]
    });
  });

  it('should ...', inject([SchoolYearService], (service: SchoolYearService) => {
    expect(service).toBeTruthy();
  }));
});
