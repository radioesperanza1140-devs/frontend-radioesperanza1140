import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DonationSectionComponent } from '../../../donation/components/donation-section.component'
@Component({
  selector: 'app-percentage-section',
  standalone: true,
  imports: [CommonModule,DonationSectionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './percentage-section.component.html',
  styleUrl: './percentage-section.component.scss'
})
export class PercentageSectionComponent {

}
