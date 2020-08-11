/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NoneContentComponent } from './none-content.component';

describe('NoneContentComponent', () => {
  let component: NoneContentComponent;
  let fixture: ComponentFixture<NoneContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoneContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoneContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
