import {Injectable} from '@angular/core';
import { Howl } from 'howler';
import {Lesson} from '../lessons/lesson.model';
import {Vocab} from '../vocab/vocab.model';
import {Line} from '../lines/line.model';
import {DataService} from './data.service';

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

  constructor(private dataService: DataService) { }

  initializeAllSounds(): void {
    console.log('Initializing sounds...');
    this.buttonClickSound = new Howl({src: ['../../assets/neutral_01.wav'], preload: true});
    this.positiveSound = new Howl({src: ['../../assets/positive_01.wav'], preload: true});
    this.negativeSound = new Howl({src: ['../../assets/negative_01.wav'], preload: true});
    this.explanationSampleSound = new Howl({src: ['../../assets/sample-narration.m4a'], preload: true});
  }

  initializeAudioForLesson(lesson: Lesson) {
    this.currentLessonAudioFiles = [];
    for (let i = 0; i < lesson.lines.length; i++) {
      if (lesson.lines[i].explanationAudioMp3) {
        this.initializeAudioForExplanation(lesson.lines[i]);
      }
      if (lesson.lines[i].exampleVocabReference) {
        this.initializeAudioForExample(lesson.lines[i]);
      }
    }
    console.log('Finished initializing narration audio for lesson');
    console.log(this.currentLessonAudioFiles);
  }

  initializeAudioForExplanation(line: Line) {
    const audioUrl = this.s3UrlPrefix + line.explanationAudioMp3;
    this.currentLessonAudioFiles.push({
      url: line.explanationAudioMp3,
      howl: new Howl({src: [audioUrl], preload: true})
    });
  }

  initializeAudioForExample(line: Line) {
    this.dataService.getVocab(line.exampleVocabReference)
      .subscribe(
        (data) => {
          const audioUrl = this.s3UrlPrefix + data.audioFilePathMp3;
          this.currentLessonAudioFiles.push({
            url: data.audioFilePathMp3,
            howl: new Howl({src: [audioUrl], preload: true})
          });
        }
      );
  }

  playVocabularyAudio(vocab: Vocab) {
    const audioUrl = this.s3UrlPrefix + vocab.audioFilePathMp3;
    const audioHowl = new Howl({src: [audioUrl], preload: true});
    audioHowl.pause();
    audioHowl.play();
  }

  initializeAudioFromFilePath(path: string) {
    const audioUrl = this.s3UrlPrefix + path;
    const audioHowl = new Howl({src: [audioUrl], preload: true});
    return audioHowl;
  }

}
