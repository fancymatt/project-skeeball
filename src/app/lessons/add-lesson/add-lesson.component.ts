import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { DataService } from '../../shared/data.service';
import { IdGenService } from '../../shared/id-gen.service';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
  possibleLessonTypes: string[];

  constructor(private dataService: DataService,
              private lessonService: LessonService,
              private router: Router,
              private uuidService: IdGenService) { }

  ngOnInit() {
    this.possibleLessonTypes = this.lessonService.getAllLessonTypes();
  }

  onSubmit(form: NgForm) {
    const newLesson = new Lesson(form.form.value.name, form.form.value.type, []);
    newLesson.id = this.uuidService.generateUniqueId();
    this.dataService.createLesson(newLesson)
      .subscribe(
        (data: Lesson) => {
          this.router.navigate(['../lessons']);
        },
        (err: any) => console.error(err),
        () => console.log('')
      );

  }

}
