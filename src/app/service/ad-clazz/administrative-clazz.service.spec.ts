/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdministrativeClazzService } from './administrative-clazz.service';

describe('Service: AdministrativeClazz', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrativeClazzService]
    });
  });

  it('should ...', inject([AdministrativeClazzService], (service: AdministrativeClazzService) => {
    expect(service).toBeTruthy();
  }));
});
