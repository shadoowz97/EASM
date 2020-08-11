import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryCategoryComponent } from './query-category.component';

describe('QueryCategoryComponent', () => {
  let component: QueryCategoryComponent;
  let fixture: ComponentFixture<QueryCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
