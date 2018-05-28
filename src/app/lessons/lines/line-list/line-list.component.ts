import { Component, OnInit } from '@angular/core';
import {Line} from '../line.model';
import {ActivatedRoute} from '@angular/router';
import {LessonService} from '../../lesson.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {
  lines: Line[];

  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService) { }

  ngOnInit() {
    this.lines = this.lessonService.getLinesForLesson(this.activatedRoute.snapshot.params.id);
  }


}
