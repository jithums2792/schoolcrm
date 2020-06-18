import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestreamWebrtcComponent } from './livestream-webrtc.component';

describe('LivestreamWebrtcComponent', () => {
  let component: LivestreamWebrtcComponent;
  let fixture: ComponentFixture<LivestreamWebrtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivestreamWebrtcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivestreamWebrtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
