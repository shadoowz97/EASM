/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QueryCertificationStudentComponent } from './query-certification-student.component';

describe('QueryCertificationStudentComponent', () => {
  let component: QueryCertificationStudentComponent;
  let fixture: ComponentFixture<QueryCertificationStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCertificationStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCertificationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
