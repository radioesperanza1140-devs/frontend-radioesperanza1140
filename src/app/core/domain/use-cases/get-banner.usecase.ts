import { Injectable } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Observable } from 'rxjs';
import { BannerImage } from '../models/banner-images.model';

@Injectable({ providedIn: 'root' })
export class GetBannerUseCase {
  constructor(private strapiService: StrapiService) {}

  execute(): Observable<BannerImage[]> {
    return this.strapiService.getBannerImages();
  }
}
