import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { Observable } from 'rxjs';

import { Lesson } from '../models/lesson.model';
import { Vocab } from '../models/vocab.model';
import { AudioService } from './audio.service';
import { DataService } from './data.service';


export interface LessonAssets {
  lineIndex: number;
  audio: Howl;
  vocabulary: Vocab;
}


@Injectable()
export class LessonService {
  public selectedLessonAssets: LessonAssets[] = [];
  private _selectedLesson: Lesson;
  private _lessonTypes: string[] = [ 'Grammar', 'Vocabulary', 'Phrase', 'Objective' ];

  get selectedLesson(): Lesson {
    return this._selectedLesson;
  }

  set selectedLesson(lesson: Lesson) {
    this._selectedLesson = lesson;
    this.initializeSelectedLessonAssets();
  }

  get lessonTypes(): string[] {
    return this._lessonTypes;
  }

  constructor(private audioService: AudioService, private dataService: DataService) { }

  initializeSelectedLessonAssets() {
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
            },
            err => console.log(err)
          );
      }
      if (line.freeVocabReference) {
        this.dataService.getVocab(line.freeVocabReference)
          .subscribe(
            data => {
              assetForLine.vocabulary = data;
              if (data.audioFilePathMp3) {
                assetForLine.audio = this.audioService.initializeAudioFromFilePath(data.audioFilePathMp3);
              }
            },
            err => console.log(err)
          );
      }
      this.selectedLessonAssets[index] = assetForLine;
    });
  }

  // CRUD

  create(newLesson: Lesson): Observable<Lesson> {
    return this.dataService.createLesson(newLesson);
  }

  get(id: string): Observable<Lesson> {
    return this.dataService.getLesson(id);
  }

  getAll(): Observable<Lesson[]> {
    return this.dataService.getAllLessons();
  }

  update(updatedLesson: Lesson): Observable<void> {
    return this.dataService.updateLesson(updatedLesson);
  }

  delete(id: string): Observable<void> {
    return this.dataService.deleteLesson(id);
  }



}
