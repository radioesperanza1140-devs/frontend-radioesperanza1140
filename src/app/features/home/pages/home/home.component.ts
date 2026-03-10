import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { PromisesComponent } from '../../components/promises/promises.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';

import { PercentageSectionComponent } from '../../components/percentage-section/percentage-section.component';
import { ProgramationComponent } from '../../components/programation/programation.component';
import {DonationSectionComponent} from '../../../donation/components/donation-section.component'
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { PresentationComponent } from '../../components/presentation/presentation.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    PromisesComponent,
    TestimonialsComponent,
    ProgramationComponent,
    PercentageSectionComponent,
    FooterComponent,
    DonationSectionComponent,
    PresentationComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
