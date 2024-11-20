import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private apiUrl = environment.apiUrl;
  logoUrl:string = environment.assetsUrl+"/logo.png";
}
