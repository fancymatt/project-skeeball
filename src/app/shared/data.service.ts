import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Lesson } from '../lessons/lesson.model';
import {SkeeballError} from './skeeballError';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getAllLessons(): Observable<Lesson[] | SkeeballError> {
    const url = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/lessons';
    return this.http.get<Lesson[]>(url)
      .pipe(
        catchError(err => this.handleHttpError(err))
      );
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

  private handleHttpError(error: HttpErrorResponse): Observable<SkeeballError> {
    const dataError = new SkeeballError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return ErrorObservable.create(dataError);
  }

}
