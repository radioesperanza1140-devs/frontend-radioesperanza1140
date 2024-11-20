import { Component } from '@angular/core';
import { GetTestimonialUsecase } from '../../../core/domain/use-cases/get-testimonial.usecase';
import { Testimonial } from '../../../core/domain/models/testimonial.model';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.scss',
  providers:[GetTestimonialUsecase]
})
export class TestimonialComponent {
  testimonials?: Testimonial[] = [];
  constructor(private getTestimonialUseCase: GetTestimonialUsecase) {}

  ngOnInit(): void {
    this.getTestimonialUseCase.execute().subscribe((response: any) => this.testimonials = response.data);
  }
}
