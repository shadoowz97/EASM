import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTermComponent } from './query-term.component';

describe('QueryTermComponent', () => {
  let component: QueryTermComponent;
  let fixture: ComponentFixture<QueryTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
