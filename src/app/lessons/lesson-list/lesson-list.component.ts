import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonService: LessonService) {}

  createLesson() {
    this.lessonService.createLesson(new Lesson('New Lesson', 'Vocabulary', false));
  }

  ngOnInit() {
    this.lessons = this.lessonService.getAllLessons();
  }
}
