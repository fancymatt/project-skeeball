import { Component, OnInit } from '@angular/core';

import { Lesson } from '../lesson.model';
import { LessonService } from '../lesson.service';
import { Line } from '../../lines/line.model';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {
  currentLine: Line;
  currentLineIndex: number;
  titleDismissed = false;
  totalLines: number;

  constructor(private lessonService: LessonService) { }

  get selectedLesson(): Lesson {
    return this.lessonService.selectedLesson;
  }

  ngOnInit() {
    this.currentLineIndex = 0;
    this.currentLine = this.lessonService.selectedLesson.lines[this.currentLineIndex];
    this.totalLines = this.selectedLesson.lines.length;
  }

  transitionToLine(nextLineIndex: number) {
    if (nextLineIndex >= 0 && nextLineIndex < this.totalLines) {
      this.currentLineIndex = nextLineIndex;
      this.currentLine = this.selectedLesson.lines[nextLineIndex];
    }
  }

  onLineDismissed(value: boolean) {
    this.transitionToLine(this.currentLineIndex + 1);
  }

}
