import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Lesson } from '../lessons/lesson.model';
import { DataService } from '../shared/data.service';
import { SkeeballError } from '../shared/skeeballError';

@Injectable()
export class LessonListResolverService implements Resolve<Lesson[] | SkeeballError> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson[]> {
    return this.dataService.getAllLessons()
      .pipe(
        catchError(err => of(err))
      );
  }
}
