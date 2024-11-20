import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PromiseComponent } from '../../components/promise/promise.component';
import { RadioPlayerComponent } from "../../components/radio-player/radio-player.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl:'./home.component.html' ,
  imports: [NavbarComponent, BannerComponent, PromiseComponent, PromiseComponent, RadioPlayerComponent]
})
export class HomeComponent {}
