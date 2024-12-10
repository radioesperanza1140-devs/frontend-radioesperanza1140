import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/home/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RadioPlayerComponent } from "./features/radio-player/components/radio-player/radio-player.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule, RadioPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Radio Esperanza 1140am';



}
