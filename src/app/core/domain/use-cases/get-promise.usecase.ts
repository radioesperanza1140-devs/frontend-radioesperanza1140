import { Injectable } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Observable } from 'rxjs';
import { Promise } from '../models/promise.model';

@Injectable({
  providedIn: 'root'
})
export class GetPromiseUsecase {

  constructor(private strapiService: StrapiService) {}

  execute(): Observable<Promise[]> {
    return this.strapiService.getLastPromise();
  }
}
