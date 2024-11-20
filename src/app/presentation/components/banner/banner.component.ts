import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Banner } from '../../../core/domain/models/banner.model';
import { GetBannerUseCase } from '../../../core/domain/use-cases/get-banner.usecase';


@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  providers: [GetBannerUseCase]
})
export class BannerComponent {

  private apiUrl = 'https://dev.radioesperanza1140.com/';
  banners?: Banner[] = [];

  constructor(private getBannerUseCase: GetBannerUseCase) {}

  ngOnInit(): void {
    this.getBannerUseCase.execute().subscribe((response: any) => {

      const mappedBanners: Banner[] = response.data.map((banner:any) => ({
        title: banner.title,
        slogan: banner.slogan,
        imagen: this.apiUrl + banner.imagen.formats.large.url
      }));
      this.banners = mappedBanners;
    });
  }
}
