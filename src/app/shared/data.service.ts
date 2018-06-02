import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Lesson } from '../lessons/lesson.model';
import { Line } from '../lines/line.model';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Lesson[]> {
    const url = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/lessons';
    return this.http.get<Lesson[]>(url);
  }

  getLesson(id: string): Observable<Lesson> {
    const url = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/lessons/' + id;
    return this.http.get<Lesson>(url);
  }

  createLesson(newLesson: Lesson): Observable<Lesson> {
    const url = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/lessons';
    return this.http.post<Lesson>(url, newLesson);
  }

  updateLesson(updatedLesson: Lesson): Observable<void> {
    const url = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/lessons/' + updatedLesson.id;
    return this.http.put<void>(url, updatedLesson);
  }

  deleteLesson(deletedLesson: Lesson): Observable<void> {
    const url = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/lessons/' + deletedLesson.id;
    return this.http.delete<void>(url);
  }

}
