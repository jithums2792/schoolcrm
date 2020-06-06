import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassallocationComponent } from './classallocation.component';

describe('ClassallocationComponent', () => {
  let component: ClassallocationComponent;
  let fixture: ComponentFixture<ClassallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
