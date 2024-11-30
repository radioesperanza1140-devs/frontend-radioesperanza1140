import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {

}
