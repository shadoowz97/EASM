/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TabService } from './tab.service';

describe('Service: Tab', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TabService]
    });
  });

  it('should ...', inject([TabService], (service: TabService) => {
    expect(service).toBeTruthy();
  }));
});
