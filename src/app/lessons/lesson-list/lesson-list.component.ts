import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { DataService } from '../../shared/data.service';
import { SkeeballError } from '../../shared/skeeballError';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styles: ['.button-row { margin: 10px; }'],
  providers: []
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonService: LessonService,
              private dataService: DataService,
              private router: ActivatedRoute) {}

  ngOnInit(): void {
    const resolvedData: Lesson[] | SkeeballError = this.router.snapshot.data['resolvedLessons'];
    if (resolvedData instanceof SkeeballError) { // this is from a tutorial I don't understand
      console.log('Lesson list component error: ' + resolvedData.friendlyMessage);
    } else {
      this.lessons = resolvedData;
    }
  }

}
