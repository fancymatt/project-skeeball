import { Component, OnInit } from '@angular/core';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css'],
  providers: []
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.getAll()
      .subscribe(
        (data) => this.lessons = data,
        (err) => console.error(err)
      );
  }

}
