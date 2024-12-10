import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AboutUsService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${environment.API_URL}/about-us-page`);
  }
}
