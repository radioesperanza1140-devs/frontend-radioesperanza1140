import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramationDetailComponent } from './programation-detail.component';

describe('ProgramationDetailComponent', () => {
  let component: ProgramationDetailComponent;
  let fixture: ComponentFixture<ProgramationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramationDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
