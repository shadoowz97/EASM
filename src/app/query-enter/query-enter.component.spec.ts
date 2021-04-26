/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryEnterComponent } from './query-enter.component';

describe('QueryEnterComponent', () => {
  let component: QueryEnterComponent;
  let fixture: ComponentFixture<QueryEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
