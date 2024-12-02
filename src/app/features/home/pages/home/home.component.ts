import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { PromisesComponent } from '../../components/promises/promises.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { ProgramationComponent } from '../../components/programation/programation.component';


import { PercentageSectionComponent } from '../../components/percentage-section/percentage-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, PromisesComponent, TestimonialsComponent, ProgramationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
