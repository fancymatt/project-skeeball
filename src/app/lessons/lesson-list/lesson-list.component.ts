import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson.model';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent {
  lessons: Lesson[] = [
    new Lesson('5 Most Important Nouns', 'Vocabulary'),
    new Lesson('Existence verb aru', 'Grammar'),
    new Lesson('Subject Marker ga', 'Grammar'),
    new Lesson('Introduction to masu form', 'Grammar'),
  ];
}
