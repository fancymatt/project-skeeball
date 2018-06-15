import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Lesson } from './lesson.model';
import { Vocab } from '../vocab/vocab.model';
import { AudioService } from '../shared/audio.service';
import { DataService } from '../shared/data.service';

export interface LessonAssets {
  lineIndex: number;
  audio: Howl;
  vocabulary: Vocab;
}

@Injectable()
export class LessonService {
  private _selectedLesson: Lesson;
  public selectedLessonAssets: LessonAssets[];

  get selectedLesson(): Lesson {
    return this._selectedLesson;
  }

  set selectedLesson(lesson: Lesson) {
    this._selectedLesson = lesson;
    this.loadSelectedLessonAssets();
  }

  constructor(private audioService: AudioService,
              private dataService: DataService) {
    this.selectedLessonAssets = [];
  }

  private _lessonTypes: string[] = [
    'Grammar', 'Vocabulary', 'Phrase'
  ];

  getAllLessonTypes() {
    return this._lessonTypes;
  }

  loadSelectedLessonAssets() {
    this.selectedLessonAssets = [];
    this._selectedLesson.lines.forEach((line, index) => {
      const assetForLine = { lineIndex: index, audio: undefined, vocabulary: undefined };
      if (line.explanationAudioMp3) {
        assetForLine.audio = this.audioService.initializeAudioFromFilePath(line.explanationAudioMp3);
      }
      if (line.exampleVocabReference) {
        this.dataService.getVocab(line.exampleVocabReference)
          .subscribe(
            data => {
              assetForLine.vocabulary = data;
              if (data.audioFilePathMp3) {
                assetForLine.audio = this.audioService.initializeAudioFromFilePath(data.audioFilePathMp3);
              }
            }
          );
      }
      this.selectedLessonAssets[index] = assetForLine;
    });
    console.log('Completed loading all lesson assets');
    console.log(this.selectedLessonAssets);
  }

}
