import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProgramationService } from './services/programation.service';
import { Programation } from '../../../../core/domain/models/programation.mode';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-programation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './programation.component.html',
  styleUrl: './programation.component.scss',
})
export class ProgramationComponent {
  programs: Programation[] = [];
  assetsUrl = environment.assetsUrl;

  constructor(private programationService: ProgramationService) {
    this.loadPrograms();
  }

  loadPrograms() {
      try {
        this.programationService.execute().subscribe((response: any) => {
          if (response && Array.isArray(response.data)) {
            this.programs = response.data.map((item: any) => ({
              title: item.title,
              description: item.description,
              horario_emision_inicio: formatTimeTo12Hour(item.horario_emision_inicio),
              horario_emision_fin: formatTimeTo12Hour(item.horario_emision_fin),
              dias_EnEmision: item.dias_EnEmision,
              imagenUrl: this.assetsUrl + item.imagen.url,
            }));
          }
      });
      } catch (error) {
        console.error('Error al cargar banners:', error);
      }
  }
}

function formatTimeTo12Hour(time24) {
  // Parsear la hora en formato HH:mm:ss.SSS
  const [hours, minutes] = time24.split(':').map(Number);

  // Determinar si es AM o PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convertir la hora al formato de 12 horas
  const hours12 = hours % 12 || 12;

  // Retornar en el formato 'h:mm a'
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}
