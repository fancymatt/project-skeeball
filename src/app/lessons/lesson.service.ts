import { Injectable } from '@angular/core';

@Injectable()
export class LessonService {

  constructor() {}

  private lessonTypes: string[] = [
    'Grammar', 'Vocabulary', 'Phrase'
  ];

  getAllLessonTypes() {
    return this.lessonTypes;
  }

}
