import { Injectable } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Observable } from 'rxjs';
import { Banner } from '../models/banner.model';

@Injectable({ providedIn: 'root' })
export class GetBannerUseCase {
  constructor(private strapiService: StrapiService) {}

  execute(): Observable<Banner[]> {
    return this.strapiService.getBanner();
  }
}
