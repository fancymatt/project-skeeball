import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson.model';
import { NgForm } from '@angular/forms';
import { LessonService } from '../lesson.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styles: ['.create-form { width: 300px; }']
})
export class AddLessonComponent implements OnInit {
  possibleLessonTypes: string[];

  constructor(private lessonService: LessonService, private router: Router) { }

  ngOnInit() {
    this.possibleLessonTypes = this.lessonService.getAllLessonTypes();
  }

  onSubmit(form: NgForm) {
    const newLesson = new Lesson(form.form.value.name, form.form.value.type, false, []);
    this.lessonService.createLesson(newLesson);
    this.router.navigate(['../lesson-shell']);
  }
}
