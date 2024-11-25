import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  standalone: true,
  imports: [],
  templateUrl: './promises.component.html',
  styleUrl: './promises.component.scss'
})
export class PromisesComponent implements AfterViewInit{
  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Agrega clase al entrar en vista
          } else {
            entry.target.classList.remove('visible'); // Opcional: Remover clase al salir
          }
        });
      },
      {
        threshold: 0.1, // Activar cuando el 10% del elemento sea visible
      }
    );

    // Observa cada contenedor
    const elements = document.querySelectorAll('.container_promise, .container_verse');
    elements.forEach((el) => observer.observe(el));
  }

}
