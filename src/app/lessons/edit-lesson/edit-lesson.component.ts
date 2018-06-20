import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  get selectedLesson(): Lesson {
    return this.lessonService.selectedLesson;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private lessonService: LessonService,
              private router: Router) { }

  ngOnInit() {
    this.loadLesson(this.activatedRoute.snapshot.params.id);
  }

  loadLesson(id: string) {
    this.lessonService.get(id)
      .subscribe(
        (data: Lesson) => {
          this.lessonService.selectedLesson = data;
        },
        (err: any) => console.error(err)
      );

  }

  onDelete() {
    this.lessonService.delete(this.selectedLesson.id)
      .subscribe(
        () => {
          this.router.navigate(['../lessons']);
        },
        (err) => console.error(err)
      );
  }

  onSave() {
    this.lessonService.update(this.selectedLesson)
      .subscribe(
        (data) => console.log(data),
        (err) => console.error(err),
        () => console.log('Finished saving lesson')
      );
  }

}
