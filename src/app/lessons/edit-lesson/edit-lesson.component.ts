import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Lesson} from '../lesson.model';
import {LessonService} from '../lesson.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  index: number;
  lesson: Lesson;

  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService) { }

  ngOnInit() {
    this.index = this.activatedRoute.snapshot.params.id;
    this.lesson = this.lessonService.getLessonById(this.index);
  }

}
