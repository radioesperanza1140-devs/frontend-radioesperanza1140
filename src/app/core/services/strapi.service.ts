import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerImage } from '../domain/models/banner-images.model';
import { Promise } from '../domain/models/promise.model';
import { Programation } from '../domain/models/programation.mode';
import { Testimonial } from '../domain/models/testimonial.model';
import { environment } from '../../../environments/environment';
import { RadioPlayer } from '../domain/models/radio-player.model';
import { Contacto } from '../domain/models/contacto';

@Injectable({ providedIn: 'root' })
export class StrapiService {
  private apiUrl = environment.API_URL;

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

  getCurrentProgramation(startTime: string, endTime: string): Observable<Programation> {
    return this.http.get<Programation>(`${this.apiUrl}/programations?populate=imagen&filters[horario_emision_inicio][$gte]=${startTime}&filters[horario_emision_fin][$lte]=${endTime}`);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<Testimonial[]>(`${this.apiUrl}/testimonials`);
  }

  getRadioStreaming(): Observable<RadioPlayer> {
    return this.http.get<RadioPlayer>(`${this.apiUrl}/radio-player`);
  }

  addContact(contactData: Contacto): Observable<any> {
    return this.http.post(`${this.apiUrl}/contactos`, { data: contactData });
  }
}
