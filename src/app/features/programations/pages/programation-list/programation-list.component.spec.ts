import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramationListComponent } from './programation-list.component';

describe('ProgramationListComponent', () => {
  let component: ProgramationListComponent;
  let fixture: ComponentFixture<ProgramationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
