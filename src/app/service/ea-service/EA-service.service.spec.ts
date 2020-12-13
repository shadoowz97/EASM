/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EAServiceService } from './EA-service.service';

describe('Service: EAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EAServiceService]
    });
  });

  it('should ...', inject([EAServiceService], (service: EAServiceService) => {
    expect(service).toBeTruthy();
  }));
});
