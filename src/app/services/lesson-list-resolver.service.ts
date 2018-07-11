import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Lesson } from '../models/lesson.model';
import { DataService } from './data.service';
import { SkeeballErrorModel } from '../models/skeeball-error.model';

@Injectable()
export class LessonListResolverService implements Resolve<Lesson[] | SkeeballErrorModel> {

  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Lesson[]> {
    return this.dataService.getAllLessons()
      .pipe(
        catchError(err => of(err))
      );
  }
}
