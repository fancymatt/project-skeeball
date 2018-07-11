import { Component, OnInit } from '@angular/core';

import { Lesson } from '../../../models/lesson.model';
import { LessonService } from '../../../services/lesson.service';

@Component({
  selector: 'app-admin-list-lessons',
  templateUrl: './admin-list-lessons.component.html',
  styleUrls: ['./admin-list-lessons.component.css'],
  providers: []
})
export class AdminListLessonsComponent implements OnInit {
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
