import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { PromisesComponent } from '../../components/promises/promises.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';


import { PercentageSectionComponent } from '../../components/percentage-section/percentage-section.component';
import { ProgramationComponent } from '../../components/programation/programation.component';
import { DonationComponent } from "../../components/donation/donation.component";
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SliderComponent,
    PromisesComponent,
    TestimonialsComponent,
    ProgramationComponent,
    PercentageSectionComponent,
    DonationComponent,
    FooterComponent
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent {}
