import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  viewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { SwiperContainer } from 'swiper/element';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import { GetBannerUseCase } from '../../../../core/domain/use-cases/get-banner.usecase';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent implements AfterViewInit {
  images: Slide[] = [];
  assetsUrl = environment.UPLOADS_URL;
  private readonly swiperContainer =
    viewChild.required<ElementRef<SwiperContainer>>('swiperContainer');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private getBannerUseCase: GetBannerUseCase
  ) {
    this.loadImages();
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Swiper.use([Navigation, Pagination]);

      const swiperOptions: SwiperOptions = {
        initialSlide: 1,
        loop: true,
        // Responsive breakpoints
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        },
        breakpointsBase: 'window',
        // setWrapperSize:true,
        // roundLengths: true,
        slidesPerView: 1,
        // zoom: true,
        autoplay: {
          delay: 8000,
        },
        speed: 500,
        allowSlideNext: true,
        allowSlidePrev: true,
        // effect: 'fade',
        parallax: true,
      };

      const swiper = new Swiper('.swiper', swiperOptions);
    }
  }

  loadImages() {
    try {
      this.getBannerUseCase.execute().subscribe((response: any) => {
        if (response && Array.isArray(response.data)) {
          this.images = response.data.map((item: any) => ({
            title: item.title,
            description: item.slogan,
            imageUrl: this.assetsUrl + item.imagen.url,
          }));
        }
      });
    } catch (error) {
      console.error('Error al cargar banners:', error);
    }
  }
}

interface Slide {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  order?: number;
  active?: boolean;
  customClass?: string;
  content?: {
    html?: string;
    text?: string;
  };
  metadata?: {
    [key: string]: any;
  };
}
