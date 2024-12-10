import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutUsService } from '../../services/about-us.service';
import { FooterComponent } from "../../../../shared/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutUsComponent {
  mision = '';
  vision = '';

  constructor(private __aboutUsService: AboutUsService) {}

  ngOnInit() {
    this.__aboutUsService.getData().subscribe((data: any) => {
      (this.mision = data.data[0].mision), (this.vision = data.data[0].vision);
      console.log(data);
    });
  }
}
