import { Injectable } from '@angular/core';
import {Lesson} from './lesson.model';

@Injectable()
export class LessonService {
  public selectedLesson: Lesson;

  constructor() {}

  private lessonTypes: string[] = [
    'Grammar', 'Vocabulary', 'Phrase'
  ];

  getAllLessonTypes() {
    return this.lessonTypes;
  }

}
