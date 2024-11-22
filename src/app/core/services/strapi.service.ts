import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerImage } from '../domain/models/banner-images.model';
import { Promise } from '../domain/models/promise.model';
import { Programation } from '../domain/models/programation.mode';
import { Testimonial } from '../domain/models/testimonial.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StrapiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBannerImages(): Observable<BannerImage[]> {
    return this.http.get<BannerImage[]>(`${this.apiUrl}/banners?populate=imagen`);
  }

  getLastPromise(): Observable<Promise[]> {
    return this.http.get<Promise[]>(`${this.apiUrl}/promises`);
  }

  getProgramations(): Observable<Programation[]> {
    return this.http.get<Programation[]>(`${this.apiUrl}/programations?populate=imagen`);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`);
  }
}
