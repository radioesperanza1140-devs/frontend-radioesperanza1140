import { Component } from '@angular/core';
import { SvgLogoComponent } from '../../../../assets/svg-logo/svg-logo.component';
import { RouterLink, RouterLinkActive,  } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SvgLogoComponent,RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
