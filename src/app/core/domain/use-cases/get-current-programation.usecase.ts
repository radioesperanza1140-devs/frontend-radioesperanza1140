import { Injectable } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Observable } from 'rxjs';
import { Programation } from '../models/programation.mode';


@Injectable({
  providedIn: 'root'
})
export class GetCurrentProgramationUsecase {

  constructor(private strapiService: StrapiService) {}
  execute(): Observable<Programation> {
    return this.strapiService.getCurrentProgramation();
  }
}
