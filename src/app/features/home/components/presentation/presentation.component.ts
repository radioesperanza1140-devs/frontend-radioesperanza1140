import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-presentation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PresentationComponent {

}
