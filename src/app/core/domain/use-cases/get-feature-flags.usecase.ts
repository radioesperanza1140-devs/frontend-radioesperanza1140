import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StrapiService } from '../../services/strapi.service';
import { FeatureFlag } from '../models/feature-flag.model';

@Injectable({ providedIn: 'root' })
export class GetFeatureFlagsUseCase {
  constructor(private strapiService: StrapiService) {}

  execute(): Observable<FeatureFlag> {
    return this.strapiService.getFeatureFlags();
  }
}
