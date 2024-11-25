import { Injectable } from '@angular/core';
import { StrapiService } from '../../services/strapi.service';
import { Observable } from 'rxjs';
import { RadioPlayer } from '../models/radio-player.model';

@Injectable({
  providedIn: 'root'
})
export class RadioPlayerUsecase {
  constructor(private strapiService: StrapiService) {}

  execute(): Observable<RadioPlayer> {
    return this.strapiService.getRadioStreaming();
  }
}
