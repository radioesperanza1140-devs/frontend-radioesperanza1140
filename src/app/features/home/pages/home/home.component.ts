import { Component } from '@angular/core';
import { SliderComponent } from '../../components/slider/slider.component';
import { PromisesComponent } from '../../components/promises/promises.component';
import Swiper from 'swiper';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SliderComponent, PromisesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
