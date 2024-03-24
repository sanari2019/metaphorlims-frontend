import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistologyFormComponent } from './histology-form.component';

describe('HistologyFormComponent', () => {
  let component: HistologyFormComponent;
  let fixture: ComponentFixture<HistologyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistologyFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistologyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
