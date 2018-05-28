import {Injectable, OnInit} from '@angular/core';
import { Lesson } from './lesson.model';
import { Line } from './lines/line.model';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class LessonService implements OnInit {

  constructor(private http: Http) {}

  private lessons: Lesson[] = [];

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
    this.lessons.push(newLesson);
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

  saveLessonsToDatabase() {
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put('https://project-skeeball.firebaseio.com/lessons.json', this.lessons, {headers: headers});
  }

  getLessonsFromDatabase() {
    return this.http.get('https://project-skeeball.firebaseio.com/lessons.json')
      .map(
        (response: Response) => {
          const lessons: Lesson[] = response.json();
          return lessons;
        }
      );
  }

  setLessons(lessons: Lesson[]) {
    this.lessons = lessons;
  }


}
