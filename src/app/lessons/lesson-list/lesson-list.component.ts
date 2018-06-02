import { Component, OnInit } from '@angular/core';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styles: ['.button-row { margin: 10px; }'],
  providers: []
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonService: LessonService, private dataService: DataService) {}

  ngOnInit(): void {
    this.updateLessonList();
  }

  updateLessonList(): void {
    this.dataService.getAllLessons()
      .subscribe(
        (data: Lesson[]) => this.lessons = data,
        (err: any) => console.log(err),
        () => console.log('')
      );
  }

  onSelectRow() {

  }
}
