import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProgramationsListService {
  constructor(private http: HttpClient) {}

  getDetailProgramtion(id: string) {
    return this.http.get(
      `${environment.API_URL}/programations/${id}?populate=imagen`
    );
  }
}
