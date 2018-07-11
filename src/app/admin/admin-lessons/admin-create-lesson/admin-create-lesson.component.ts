import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Lesson } from '../../../shared/lesson.model';
import { LessonService } from '../../../shared/lesson.service';

@Component({
  selector: 'app-admin-create-lesson',
  templateUrl: './admin-create-lesson.component.html',
  styleUrls: ['./admin-create-lesson.component.css']
})
export class AdminCreateLessonComponent implements OnInit {
  possibleLessonTypes: string[];

  constructor(private lessonService: LessonService,
              private router: Router) { }

  ngOnInit() {
    this.possibleLessonTypes = this.lessonService.lessonTypes;
  }

  onSubmit(form: NgForm) {
    const newLesson = new Lesson(form.form.value.name, form.form.value.type, []);
    this.lessonService.create(newLesson)
      .subscribe(
        (data: Lesson) => {
          this.router.navigate(['../lessons/' + data.id]);
        },
        (err: any) => console.error(err)
      );

  }

}
