import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Programation } from '../../../../core/domain/models/programation.mode';
import { environment } from '../../../../../environments/environment';
import { ProgramationService } from '../../../home/components/programation/services/programation.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { FooterComponent } from "../../../../shared/footer/footer.component";

@Component({
  selector: 'app-programation-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FooterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './programation-list.component.html',
  styleUrls: ['./programation-list.component.scss'],
})
export class ProgramationListComponent implements OnInit, OnDestroy {
  programs: Programation[] = [];
  listPrograms: Programation[] = [];
  assetsUrl = environment.UPLOADS_URL;
  isLoading: boolean = true; // Variable para gestionar el estado de carga

  constructor(
    private programationService: ProgramationService,
    private cdRef: ChangeDetectorRef // Para forzar la detección de cambios
  ) {}

  ngOnInit() {
    this.loadPrograms();
  }

  ngOnDestroy() {
    // Opcional: Si necesitas limpiar algo cuando el componente se destruye, puedes hacerlo aquí.
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
              imagenUrl: this.assetsUrl + (item.imagen != null ? item.imagen.url : 'default-programation.png'),
            }));

            this.programs = this.listPrograms; // Asignar los programas cargados
            this.isLoading = false; // Terminar el estado de carga
            this.cdRef.detectChanges(); // Forzar la detección de cambios para actualizar la vista
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
