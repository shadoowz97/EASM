/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentProfileServiceService } from './student-profile-service.service';

describe('Service: StudentProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentProfileServiceService]
    });
  });

  it('should ...', inject([StudentProfileServiceService], (service: StudentProfileServiceService) => {
    expect(service).toBeTruthy();
  }));
});
