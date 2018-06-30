import { Component, OnInit } from '@angular/core';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {
  playerContent: any[];

  constructor(private lessonService: LessonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playerContent = [{type: 'lesson', id: this.activatedRoute.snapshot.params.id }];
  }

}
