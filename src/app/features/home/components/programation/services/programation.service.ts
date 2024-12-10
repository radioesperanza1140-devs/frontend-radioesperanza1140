import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StrapiService } from '../../../../../core/services/strapi.service';
import { Programation } from '../../../../../core/domain/models/programation.mode';


@Injectable({
  providedIn: 'root',
})
export class ProgramationService {
  constructor(private strapiService: StrapiService) {}
  execute(): Observable<Programation[]> {
    return this.strapiService.getProgramations();
  }
}
