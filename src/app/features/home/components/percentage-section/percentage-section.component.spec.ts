import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageSectionComponent } from './percentage-section.component';

describe('PercentageSectionComponent', () => {
  let component: PercentageSectionComponent;
  let fixture: ComponentFixture<PercentageSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentageSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
