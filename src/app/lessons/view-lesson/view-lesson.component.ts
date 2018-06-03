import { Component, OnInit } from '@angular/core';
import {Lesson} from '../lesson.model';
import {LessonService} from '../lesson.service';
import {Line} from '../../lines/line.model';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css']
})
export class ViewLessonComponent implements OnInit {
  currentLesson: Lesson;
  currentLineIndex: number;
  totalLines: number;
  currentLine: Line;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.currentLesson = this.lessonService.selectedLesson;
    this.currentLineIndex = 0;
    this.currentLine = this.lessonService.selectedLesson.lines[this.currentLineIndex];
    this.totalLines = this.currentLesson.lines.length;
  }

  advanceToNextLine() {
    if(this.currentLineIndex < this.totalLines - 1) {
      this.currentLineIndex++;
      this.currentLine = this.currentLesson.lines[this.currentLineIndex];
    } else {
      this.currentLineIndex = 0;
      this.currentLine = this.currentLesson.lines[0];
    }
  }


}
