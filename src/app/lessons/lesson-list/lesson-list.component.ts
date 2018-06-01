import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styles: ['.button-row { margin: 10px; }']
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonService: LessonService) {}

  ngOnInit() {
    this.lessons = this.lessonService.getAllLessons();
  }

  onSave() {
    this.lessonService.saveLessonsToDatabase()
      .subscribe(
        (response) => console.log(response),
        (error) => console.error(error)
      );
  }

  onLoad() {
    this.lessonService.getLessonsFromDatabase()
      .subscribe(
        (lessons: any[]) => {
          this.lessons = lessons;
          this.lessonService.setLessons(lessons);
        }
      );
  }
}
