/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TermServiceService } from './term-service.service';

describe('Service: TermService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermServiceService]
    });
  });

  it('should ...', inject([TermServiceService], (service: TermServiceService) => {
    expect(service).toBeTruthy();
  }));
});
