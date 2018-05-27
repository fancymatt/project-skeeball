import {Lesson} from './lesson.model';

export class LessonService {
  private lessons: Lesson[] = [
    new Lesson('5 Most Important Nouns', 'Vocabulary', false),
    new Lesson('Existence verb aru', 'Grammar', false),
    new Lesson('Subject Marker ga', 'Grammar', false),
    new Lesson('Introduction to masu form', 'Grammar', false),
  ];

  getAllLessons() {
    return this.lessons;
  }

}
