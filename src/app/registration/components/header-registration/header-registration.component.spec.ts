import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRegistrationComponent } from './header-registration.component';

describe('HeaderRegistrationComponent', () => {
  let component: HeaderRegistrationComponent;
  let fixture: ComponentFixture<HeaderRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
