import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleRegistrationComponent } from './sample-registration.component';

describe('SampleRegistrationComponent', () => {
  let component: SampleRegistrationComponent;
  let fixture: ComponentFixture<SampleRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
