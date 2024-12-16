import { Injectable } from '@angular/core';
import { StrapiService } from '../../../../../core/services/strapi.service';
import { Observable } from 'rxjs';
import { Programation } from '../../../../../core/domain/models/programation.mode';
import { Testimonial } from '../../../../../core/domain/models/testimonial.model';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private strapiService: StrapiService) {}
    execute(): Observable<Testimonial[]> {
      return this.strapiService.getTestimonials();
    }
}

