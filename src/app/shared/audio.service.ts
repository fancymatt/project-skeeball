import {Injectable} from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  buttonClickSound: Howl;
  positiveSound: Howl;
  negativeSound: Howl;
  explanationSampleSound: Howl;

  constructor() {
  }

  initializeAllSounds(): void {
    console.log('Initializing sounds...');
    this.buttonClickSound = new Howl({src: ['../../assets/neutral_01.wav'], preload: true},);
    this.positiveSound = new Howl({src: ['../../assets/positive_01.wav'], preload: true});
    this.negativeSound = new Howl({src: ['../../assets/negative_01.wav'], preload: true});
    this.explanationSampleSound = new Howl({src: ['../../assets/sample-narration.m4a'], preload: true});
  }

}
