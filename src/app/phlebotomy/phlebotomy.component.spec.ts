import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhlebotomyComponent } from './phlebotomy.component';

describe('PhlebotomyComponent', () => {
  let component: PhlebotomyComponent;
  let fixture: ComponentFixture<PhlebotomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhlebotomyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhlebotomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
