import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { Lesson } from '../lessons/lesson.model';
import { SkeeballError } from './skeeballError';
import { Vocab } from '../vocab/vocab.model';
import { IdGenService } from './id-gen.service';
import { Objective } from '../objectives/objective.model';

@Injectable()
export class DataService {
  private apiEndpoint = 'https://9ygt6xpwi7.execute-api.us-west-1.amazonaws.com/dev/';

  constructor(private http: HttpClient, private uuidService: IdGenService) {
  }

  // Lessons

  getAllLessons(): Observable<Lesson[]> {
    const url = this.apiEndpoint + 'lessons';
    return this.http.get<Lesson[]>(url);
  }

  getLesson(id: string): Observable<Lesson> {
    const url = this.apiEndpoint + 'lessons/' + id;
    return this.http.get<Lesson>(url);
  }

  createLesson(newLesson: Lesson): Observable<Lesson> {
    const url = this.apiEndpoint + 'lessons';
    newLesson.id = this.uuidService.generateUniqueId();
    return this.http.post<Lesson>(url, newLesson);
  }

  updateLesson(updatedLesson: Lesson): Observable<void> {
    const url = this.apiEndpoint + 'lessons/' + updatedLesson.id;
    return this.http.put<void>(url, updatedLesson);
  }

  deleteLesson(deletedLessonId: string): Observable<void> {
    const url = this.apiEndpoint + 'lessons/' + deletedLessonId;
    return this.http.delete<void>(url);
  }

  // Vocabs

  getAllVocabs(): Observable<Vocab[]> {
    const url = this.apiEndpoint + 'vocabs';
    return this.http.get<Vocab[]>(url);
  }

  createVocab(newVocab: Vocab): Observable<Vocab> {
    const url = this.apiEndpoint + 'vocabs';
    newVocab.id = this.uuidService.generateUniqueId();
    return this.http.post<Vocab>(url, newVocab);
  }

  getVocab(id: string): Observable<Vocab> {
    const url = this.apiEndpoint + 'vocabs/' + id;
    return this.http.get<Vocab>(url);
  }

  updateVocab(updatedVocab: Vocab): Observable<void> {
    const url = this.apiEndpoint + 'vocabs/' + updatedVocab.id;
    return this.http.put<void>(url, updatedVocab);
  }

  deleteVocab(deletedVocab: Vocab): Observable<void> {
    const url = this.apiEndpoint + 'vocabs/' + deletedVocab.id;
    return this.http.delete<void>(url);
  }


  private handleHttpError(error: HttpErrorResponse): Observable<SkeeballError> {
    const dataError = new SkeeballError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data.';
    return ErrorObservable.create(dataError);
  }

  // Objectives

  getAllObjectives(): Observable<Objective[]> {
    const url = this.apiEndpoint + 'objectives';
    return this.http.get<Objective[]>(url);
  }

  getObjective(id: string): Observable<Objective> {
    const url = this.apiEndpoint + 'objectives/' + id;
    return this.http.get<Objective>(url);
  }

  createObjective(newObjective: Objective): Observable<Objective> {
    const url = this.apiEndpoint + 'objectives';
    newObjective.id = this.uuidService.generateUniqueId();
    return this.http.post<Objective>(url, newObjective);
  }

  updateObjective(updatedObjective: Objective): Observable<void> {
    const url = this.apiEndpoint + 'objectives/' + updatedObjective.id;
    return this.http.put<void>(url, updatedObjective);
  }

  deleteObjective(deletedObjective: Objective): Observable<void> {
    const url = this.apiEndpoint + 'objectives/' + deletedObjective.id;
    return this.http.delete<void>(url);
  }

}
