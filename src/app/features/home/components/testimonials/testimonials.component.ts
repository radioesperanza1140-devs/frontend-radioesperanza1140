import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostListener,
} from '@angular/core';
import { TestimonialService } from './services/testimonial.service';
import { Testimonial } from '../../../../core/domain/models/testimonial.model';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements AfterViewInit {
  testimonios: Testimonial[] = [];
  public value = 0;
  public windowWidth = window.innerWidth;
  private swiper: Swiper;

  constructor(private testimoniosService: TestimonialService) {
    this.getTestimonios();
  }

  ngAfterViewInit(): void {
    Swiper.use([Navigation, Pagination]);
    this.swiper = new Swiper('#swiperTestimonios', {
      slidesPerView: this.changeslidesPerView(),
      loop: true,
      speed: 500,
      effect: 'coverflow',
      coverflowEffect: {
        depth: 100,
        modifier: 1,
        rotate: 50,
        scale: 1,
        slideShadows: false,
        stretch: 0,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
    // Actualizamos el número de slides y también actualizamos el swiper
    this.swiper.params.slidesPerView = this.changeslidesPerView();
    this.swiper.update(); // Esto asegura que Swiper se actualice después del cambio de tamaño
  }

  changeslidesPerView() {
    if (this.windowWidth > 1266) {
      this.value = 3;
    } else if (this.windowWidth < 1266) {
      this.value = 2;
    }
    if (this.windowWidth < 1100) {
      this.value = 2;
    }

    if (this.windowWidth < 860) {
      this.value = 1;
    }

    if (this.windowWidth < 690) {
      this.value = 1;
    }

    if (this.windowWidth < 380) {
      this.value = 1;
    }

    return this.value;
  }

  getTestimonios() {
    try {
      this.testimoniosService.execute().subscribe({
        next: (response: any) => {
          if (response && Array.isArray(response.data)) {
            this.testimonios = response.data;
          }
        },
        error: (err) => {
          console.error('Error al cargar Testimonio:', err);
        },
      });
    } catch (error) {
      console.error('Error inesperado al cargar Testimonio:', error);
    }
  }
}
