import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lesson} from '../lesson.model';
import {LessonService} from '../lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styles: ['.button-row { margin: 10px; }']
})
export class EditLessonComponent implements OnInit {
  index: number;
  lesson: Lesson;

  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService, private router: Router) { }

  ngOnInit() {
    this.index = this.activatedRoute.snapshot.params.id;
    this.lesson = this.lessonService.getLessonById(this.index);
  }

  onDelete() {
    this.lessonService.deleteLessonById(this.index);
    this.router.navigate(['../lesson-shell']);
  }

}
