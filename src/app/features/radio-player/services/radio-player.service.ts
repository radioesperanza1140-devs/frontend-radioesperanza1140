import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RadioPlayerService {
  private audioElement: HTMLAudioElement;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private volumeSubject = new BehaviorSubject<number>(0.5); // Valor inicial del volumen

  isPlaying = this.isPlayingSubject.asObservable();
  volume = this.volumeSubject.asObservable();

  initPlayer(audioElement: HTMLAudioElement) {
    this.audioElement = audioElement;
    this.audioElement.volume = this.volumeSubject.value; // Establecer volumen inicial
  }

  togglePlay() {
    if (this.isPlayingSubject.value) {
      this.audioElement.pause();
    } else {
      this.audioElement.play();
    }
    this.isPlayingSubject.next(!this.isPlayingSubject.value);
  }

  setVolume(volume: number) {
    this.audioElement.volume = volume;
    this.volumeSubject.next(volume);
  }

  stopPlayer() {
    this.audioElement.pause();
    this.isPlayingSubject.next(false);
  }
}
