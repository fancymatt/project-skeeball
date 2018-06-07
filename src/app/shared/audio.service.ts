import {Injectable} from '@angular/core';
import { Howl } from 'howler';
import {Lesson} from '../lessons/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  buttonClickSound: Howl;
  positiveSound: Howl;
  negativeSound: Howl;
  explanationSampleSound: Howl;
  currentLessonAudioFiles: {url: string, howl: Howl}[];
  s3UrlPrefix = 'https://s3-us-west-2.amazonaws.com/project-skeeball-audio/';

  constructor() { }

  initializeAllSounds(): void {
    console.log('Initializing sounds...');
    this.buttonClickSound = new Howl({src: ['../../assets/neutral_01.wav'], preload: true},);
    this.positiveSound = new Howl({src: ['../../assets/positive_01.wav'], preload: true});
    this.negativeSound = new Howl({src: ['../../assets/negative_01.wav'], preload: true});
    this.explanationSampleSound = new Howl({src: ['../../assets/sample-narration.m4a'], preload: true});
  }

  initializeNarrationForLesson(lesson: Lesson) {
    this.currentLessonAudioFiles = [];
    for (let i = 0; i < lesson.lines.length; i++) {
      if (lesson.lines[i].explanationAudioMp3) {
        const audioUrl = this.s3UrlPrefix + lesson.lines[i].explanationAudioMp3;
        this.currentLessonAudioFiles.push({
          url: lesson.lines[i].explanationAudioMp3,
          howl: new Howl({src: [audioUrl], preload: true})
        });
      }
    }
    console.log('Finished initializing narration audio for lesson');
    console.log(this.currentLessonAudioFiles);
  }

}
