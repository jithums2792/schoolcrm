import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectallocationComponent } from './subjectallocation.component';

describe('SubjectallocationComponent', () => {
  let component: SubjectallocationComponent;
  let fixture: ComponentFixture<SubjectallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
