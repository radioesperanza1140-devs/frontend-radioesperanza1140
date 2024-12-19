import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { AboutUsService } from '../../services/about-us.service';
import { FooterComponent } from '../../../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit, AfterViewInit {
  mision = '';
  vision = '';
  sintonizantes = 0;
  seguidores = 0;
  years = 0;

  @ViewChild('numbersContainer') numbersContainer: ElementRef | undefined;

  constructor(private __aboutUsService: AboutUsService) {}

  ngOnInit() {
    // Obtener los datos de la misión y visión
    this.__aboutUsService.getData().subscribe((data: any) => {
      this.mision = data.data[0].mision;
      this.vision = data.data[0].vision;
    });
  }

  ngAfterViewInit() {
    this.startOnVisible();
  }

  startOnVisible() {
    // Usamos Intersection Observer para detectar cuando el componente es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Iniciar la animación solo cuando el componente esté visible
            this.startIncrement();
            observer.unobserve(entry.target); // Dejar de observar una vez que se ha iniciado la animación
          }
        });
      },
      {
        threshold: 0.5, // El componente debe estar al menos 50% visible
      }
    );

    if (this.numbersContainer) {
      observer.observe(this.numbersContainer.nativeElement);
    }
  }

  startIncrement() {
    // Valores objetivo
    const targetNumbers = {
      sintonizantes: 23000,
      seguidores: 17000,
      years: 20,
    };

    // Valores actuales
    let currentSintonizantes = 0;
    let currentSeguidores = 0;
    let currentYears = 0;

    const interval = setInterval(() => {
      let allComplete = true;

      // Incrementar Sintonizantes más rápido
      if (currentSintonizantes < targetNumbers.sintonizantes) {
        currentSintonizantes += Math.ceil(targetNumbers.sintonizantes / 50); // Más rápido
        allComplete = false;
      }

      // Incrementar Seguidores más rápido
      if (currentSeguidores < targetNumbers.seguidores) {
        currentSeguidores += Math.ceil(targetNumbers.seguidores / 50); // Más rápido
        allComplete = false;
      }

      // Incrementar Años de forma más lenta
      if (currentYears < targetNumbers.years) {
        currentYears += 1; // Incremento de 1 por vez
        allComplete = false;
      }

      // Actualizar los valores en el componente
      this.sintonizantes = currentSintonizantes;
      this.seguidores = currentSeguidores;
      this.years = currentYears;

      // Detener la animación cuando todos los números hayan alcanzado su objetivo
      if (allComplete) {
        clearInterval(interval);
      }
    }, 30); // Intervalo de actualización: 30ms
  }
}
