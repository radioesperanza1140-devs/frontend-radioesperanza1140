import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DonationComponent {

}
