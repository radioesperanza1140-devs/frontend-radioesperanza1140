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
  ) {}

  initializeSwiper() {
    if (isPlatformBrowser(this.platformId)) {
      Swiper.use([Navigation, Pagination]);

      const swiperOptions: SwiperOptions = {
        initialSlide: 0,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        },
        autoplay: {
          delay: 8000,
        },
        speed: 500,
        slidesPerView: 1,
        parallax: true,
      };

      // Usa el ID del contenedor para inicializar Swiper
      const swiper = new Swiper('#swiperBanner', swiperOptions);
    }
  }
  ngAfterViewInit(): void {
    this.loadImages();
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
          this.initializeSwiper();
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
