import {Component, OnInit} from '@angular/core';
import {Line} from '../line.model';
import {ActivatedRoute} from '@angular/router';
import {LessonService} from '../../lessons/lesson.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css']
})
export class LineListComponent implements OnInit {
  lines: Line[] = [];

  constructor(private activatedRoute: ActivatedRoute, private lessonService: LessonService) { }

  ngOnInit() {
    this.lines = this.lessonService.selectedLesson.lines;
  }


}
