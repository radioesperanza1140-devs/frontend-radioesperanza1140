import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent {
  public value = 0;
  public windowWidth = window.innerWidth;
  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }

  changeslidesPerView() {
    if (this.windowWidth > 1266) {
      this.value = 3;
    } else if (this.windowWidth < 1266) {
      this.value = 2;
    }
    if (this.windowWidth < 1100) {
      this.value = 2;
    }

    if (this.windowWidth < 860) {
      this.value = 1;
    }

    if (this.windowWidth < 690) {
      this.value = 1;
    }

    if (this.windowWidth < 380) {
      this.value = 1;
    }

    return this.value;
  }
}
