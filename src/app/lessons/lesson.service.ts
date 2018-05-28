import { Injectable } from '@angular/core';
import { Lesson } from './lesson.model';

@Injectable()
export class LessonService {
  private lessons: Lesson[] = [
    new Lesson('5 Most Important Nouns', 'Vocabulary', false),
    new Lesson('Existence verb aru', 'Grammar', false),
    new Lesson('Subject Marker ga', 'Grammar', false),
    new Lesson('Introduction to masu form', 'Grammar', false),
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

}
