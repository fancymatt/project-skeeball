import { Injectable } from '@angular/core';
import { Lesson } from './lesson.model';
import { Line } from './lines/line.model';

@Injectable()
export class LessonService {
  private lessons: Lesson[] = [
    new Lesson('5 Most Important Nouns', 'Vocabulary', false, [
      new Line('text', 'Here is some sample text' ),
      new Line('text', 'Here is some more sample text' )
    ]),
    new Lesson('Existence verb aru', 'Grammar', false, []),
    new Lesson('Subject Marker ga', 'Grammar', false, []),
    new Lesson('Introduction to masu form', 'Grammar', false, []),
  ];

  private lessonTypes: string[] = [
    'Grammar', 'Vocabulary', 'Phrase'
  ];

  getAllLessons() {
    console.log('Fetching lesson list...');
    console.log('There are ' + this.lessons.length + ' lessons.');
    return this.lessons;
  }

  getAllLessonTypes() {
    return this.lessonTypes;
  }

  createLesson(newLesson: Lesson) {
    console.log('Creating a new lesson...');
    console.log(newLesson);
    this.lessons.push(newLesson);
    console.log(this.lessons.length);
  }

  getLessonById(id: number) {
    return this.lessons[id];
  }

  deleteLessonById(id: number) {
    this.lessons.splice(id, 1);
  }

  getLinesForLesson(id: number) {
    return this.lessons[id].lines;
  }

  createLineInLesson(id: number, newLine: Line) {
    this.lessons[id].lines.push(newLine);
  }

}
