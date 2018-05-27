import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson.model';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent {
  lessons: Lesson[] = [
    new Lesson('lesson title', 'lesson detail')
  ];
}
