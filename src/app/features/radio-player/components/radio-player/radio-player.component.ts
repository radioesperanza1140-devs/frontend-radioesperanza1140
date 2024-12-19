import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioPlayerUsecase } from '../../../../core/domain/use-cases/radio-player.usecase';
import { RadioPlayer } from '../../../../core/domain/models/radio-player.model';
import { SvgLogoComponent } from '../../../../assets/svg-logo/svg-logo.component';
import { GetCurrentProgramationUsecase } from '../../../../core/domain/use-cases/get-current-programation.usecase';
import { Programation } from '../../../../core/domain/models/programation.mode';
import { environment } from '../../../../../environments/environment';
import { interval } from 'rxjs';
@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [CommonModule, FormsModule, SvgLogoComponent],
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss'],
})
export class RadioPlayerComponent implements OnInit {
  audioSrc = ''; // URL del stream
  currentProgram: Programation;
  isPlaying = false;
  volume = 0.5;
  assetsUrl = environment.UPLOADS_URL;
  program: Programation;
  programationInfo: string = '';

  constructor(
    private radioPlayerUseCase: RadioPlayerUsecase,
    private currentProgramation: GetCurrentProgramationUsecase
  ) {
    this.radioPlayerUseCase
      .execute()
      .subscribe((t: any) => (this.audioSrc = t.data.audio_url));
  }

  ngOnInit(): void {
    this.loadCurrentProgram();
  }

  togglePlay(audio: HTMLAudioElement) {
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  updateVolume(audio: HTMLAudioElement) {
    audio.volume = this.volume;
  }

  async loadCurrentProgram() {
    await this.currentPrograma();
  }

  async currentPrograma() {
    this.program = {
      id: '',
      documentId: '',
      imagenUrl: 'logo.png',
      title: 'Radio Esperanza 1140am',
      horario_emision_inicio: '',
      horario_emision_fin: '',
      description: '',
      dias_EnEmision: '',
      orden: 0,
    };

    await this.currentProgramation.execute().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.data)) {
          if (response.data.length > 0) {
            var item = response.data[0];

            this.program = {
              id: item.id,
              documentId: item.documentId,
              title: item.title,
              description: item.description,
              horario_emision_inicio: formatTimeTo12Hour(
                item.horario_emision_inicio
              ),
              horario_emision_fin: formatTimeTo12Hour(item.horario_emision_fin),
              dias_EnEmision: item.dias_EnEmision,
              imagenUrl:
                this.assetsUrl +
                (item?.imagen != null
                  ? item?.imagen.url
                  : '/default-programation.png'),
              orden: item.orden,
            };
            this.programationInfo = `${this.program.horario_emision_inicio} - ${this.program.horario_emision_fin}`;
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar programas:', err);
      },
    });
  }
}
function formatTimeTo12Hour(time24) {
  if (time24 != null) {
    // Parsear la hora en formato HH:mm:ss.SSS
    const [hours, minutes] = time24.split(':').map(Number);

    // Determinar si es AM o PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convertir la hora al formato de 12 horas
    const hours12 = hours % 12 || 12;

    // Retornar en el formato 'h:mm a'
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  return null;
}
