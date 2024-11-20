import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from "./presentation/components/banner/banner.component";
import { NavbarComponent } from "./presentation/components/navbar/navbar.component";
import { PromiseComponent } from "./presentation/components/promise/promise.component";
import { ProgamationComponent } from "./presentation/components/progamation/progamation.component";
import { TestimonialComponent } from "./presentation/components/testimonial/testimonial.component";
import { JoinComponent } from "./presentation/components/join/join.component";
import { RadioPlayerComponent } from './presentation/components/radio-player/radio-player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BannerComponent,
    NavbarComponent,
    PromiseComponent,
    ProgamationComponent,
    TestimonialComponent,
    JoinComponent,
    RadioPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'web-radioesperanza-1140';
}
