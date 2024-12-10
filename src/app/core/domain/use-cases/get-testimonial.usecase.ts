import { Injectable } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Observable } from 'rxjs';
import { Testimonial } from '../models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class GetTestimonialUsecase {
  constructor(private strapiService: StrapiService) {}

  execute(): Observable<Testimonial[]> {
    return this.strapiService.getTestimonials();
  }
}
