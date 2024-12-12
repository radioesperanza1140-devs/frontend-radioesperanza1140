import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioPlayerUsecase } from '../../../../core/domain/use-cases/radio-player.usecase';
import { RadioPlayer } from '../../../../core/domain/models/radio-player.model';
import { SvgLogoComponent } from "../../../../assets/svg-logo/svg-logo.component";
import { GetCurrentProgramationUsecase } from '../../../../core/domain/use-cases/get-current-programation.usecase';
import { Programation } from '../../../../core/domain/models/programation.mode';

@Component({
  selector: 'app-radio-player',
  standalone: true,
  imports: [CommonModule, FormsModule, SvgLogoComponent],
  templateUrl: './radio-player.component.html',
  styleUrls: ['./radio-player.component.scss']
})
export class RadioPlayerComponent {
  audioSrc = ''; // URL del stream
  currentProgram : Programation;
  isPlaying = false;
  volume = 0.5;

  constructor(private radioPlayerUseCase:RadioPlayerUsecase,
              private currentProgramation: GetCurrentProgramationUsecase
  ){
    this.radioPlayerUseCase.execute().subscribe((t:any)=> this.audioSrc = t.data.audio_url);
    // this.currentProgramation.execute(new Date(), new Date()).subscribe((t:Programation)=> t.title);
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
}
