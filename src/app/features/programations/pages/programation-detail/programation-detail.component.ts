import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramationsListService } from '../../services/programations-list.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-programation-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './programation-detail.component.html',
  styleUrls: ['./programation-detail.component.scss'],
})
export class ProgramationDetailComponent {
  programId: string | null = null;
  program: any = {};
  public inicio;
  public fin;
  public imgUrl;
  assetsUrl = environment.UPLOADS_URL;
  public isLoading = true; // Variable para manejar el estado de carga

  constructor(
    private route: ActivatedRoute,
    private __servicesProgramationDetail: ProgramationsListService,
    private cdRef: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.formatTimeTo12Hour(this.fin);
    this.formatTimeTo12Hour(this.inicio);
  }

  ngOnInit(): void {
    this.programId = this.route.snapshot.paramMap.get('id');

    this.__servicesProgramationDetail
      .getDetailProgramtion(this.programId)
      .subscribe((data: any) => {
        this.program = data.data;
        this.inicio = this.formatTimeTo12Hour(data.data.horario_emision_inicio);
        this.fin = this.formatTimeTo12Hour(data.data.horario_emision_fin);

        // Después de recibir los datos, actualizar imgUrl
        this.imgUrl = this.assetsUrl + this.program.imagen.url;

        // Una vez que los datos se hayan cargado, establecer isLoading en false
        this.isLoading = false;

        // Forzar la detección de cambios para actualizar la vista
        this.cdRef.detectChanges();
      });
  }

  public formatTimeTo12Hour(time24) {
    if (time24 != null) {
      const [hours, minutes] = time24.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return null;
  }
}
