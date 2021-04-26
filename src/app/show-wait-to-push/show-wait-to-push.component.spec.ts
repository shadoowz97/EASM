/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShowWaitToPushComponent } from './show-wait-to-push.component';

describe('ShowWaitToPushComponent', () => {
  let component: ShowWaitToPushComponent;
  let fixture: ComponentFixture<ShowWaitToPushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowWaitToPushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWaitToPushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
