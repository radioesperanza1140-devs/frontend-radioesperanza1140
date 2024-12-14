import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ProgramationService } from './services/programation.service';
import { Programation } from '../../../../core/domain/models/programation.mode';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-programation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './programation.component.html',
  styleUrls: ['./programation.component.scss'],
})
export class ProgramationComponent implements OnInit, OnDestroy {
  programs: Programation[] = [];
  listPrograms: Programation[] = [];
  assetsUrl = environment.UPLOADS_URL;
  isLoading: boolean = true; // Variable para manejar el estado de carga

  constructor(
    private programationService: ProgramationService,
    private cdRef: ChangeDetectorRef // Para forzar la detección de cambios
  ) {}

  ngOnInit() {
    this.loadPrograms(); // Cargar programas al inicializar el componente
  }

  ngOnDestroy() {
    // Opcional: Limpiar recursos si es necesario (si se tiene suscripciones o listeners)
  }

  loadPrograms() {
    this.isLoading = true; // Iniciar el estado de carga antes de hacer la solicitud
    try {
      this.programationService.execute().subscribe({
        next: (response: any) => {
          if (response && Array.isArray(response.data)) {
            this.listPrograms = response.data.map((item: any) => ({
              id: item.documentId,
              title: item.title,
              description: item.description,
              horario_emision_inicio: this.formatTimeTo12Hour(
                item.horario_emision_inicio
              ),
              horario_emision_fin: this.formatTimeTo12Hour(
                item.horario_emision_fin
              ),
              dias_EnEmision: item.dias_EnEmision,
              imagenUrl: this.assetsUrl + item.imagen.url,
            }));

            // Mostrar solo los tres primeros programas
            this.programs = this.listPrograms.slice(0, 3);

            // Cambiar el estado de carga a false una vez que los datos se hayan cargado
            this.isLoading = false;

            // Forzar la detección de cambios para actualizar la vista
            this.cdRef.detectChanges();
          } else {
            console.warn('La respuesta no tiene el formato esperado.');
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('Error al cargar programas:', err);
          this.isLoading = false;
        },
      });
    } catch (error) {
      console.error('Error inesperado al cargar programas:', error);
      this.isLoading = false;
    }
  }

  formatTimeTo12Hour(time24: string) {
    if (time24 != null) {
      const [hours, minutes] = time24.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return null;
  }
}
