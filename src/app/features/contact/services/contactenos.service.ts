import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StrapiService } from '../../../core/services/strapi.service';
import { Programation } from '../../../core/domain/models/programation.mode';
import { Contacto } from '../../../core/domain/models/contacto';


@Injectable({
  providedIn: 'root',
})
export class ContactenosService {
  contacto: Contacto;

  constructor(private strapiService: StrapiService) {}

  addContactenos(contacto:Contacto) {
    this.strapiService.addContact(this.contacto);
  }
}
