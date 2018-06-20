import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
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
