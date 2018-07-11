import { Component, OnInit } from '@angular/core';

import { Lesson } from '../../../shared/lesson.model';
import { LessonService } from '../../../shared/lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './admin-preview-lesson.component.html',
  styleUrls: ['./admin-preview-lesson.component.css']
})
export class AdminPreviewLessonComponent implements OnInit {
  playerContent: any[];

  constructor(private lessonService: LessonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playerContent = [{type: 'lesson', id: this.activatedRoute.snapshot.params.id }];
  }

}
