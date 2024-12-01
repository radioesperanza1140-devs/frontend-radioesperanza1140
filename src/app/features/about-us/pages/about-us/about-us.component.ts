import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
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
