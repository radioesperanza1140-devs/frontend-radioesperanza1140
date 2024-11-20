import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgamationComponent } from './progamation.component';

describe('ProgamationComponent', () => {
  let component: ProgamationComponent;
  let fixture: ComponentFixture<ProgamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgamationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
