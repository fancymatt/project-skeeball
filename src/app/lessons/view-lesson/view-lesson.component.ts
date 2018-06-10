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

  /*
  TODO
  currentLine is changed via the controls, but our individual components
  do not know that it has changed. Use Observables?

   */

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.currentLesson = this.lessonService.selectedLesson;
    this.currentLineIndex = 0;
    this.currentLine = this.lessonService.selectedLesson.lines[this.currentLineIndex];
    this.totalLines = this.currentLesson.lines.length;
  }

  transitionToLine(nextLineIndex: number) {
    if (nextLineIndex >= 0 && nextLineIndex < this.totalLines) {
      this.currentLineIndex = nextLineIndex;
      this.currentLine = this.currentLesson.lines[nextLineIndex];
    }
    console.log('Current line index is ' + this.currentLineIndex);
    console.log('Current line type is ' + this.currentLine.type);
  }

  onLineDismissed(value: boolean) {
    this.transitionToLine(this.currentLineIndex + 1);
  }

}

/*

How to handle animation state.
Make a component for every line type (will have to do this eventually)
Each line type will respond to transition-in, transition-out events in its own way.
Even when transitioning between two line types of the same type, we remove and initialize a new type.
Can't be fancy with keeping a static video track if we do that.
Each line type's CSS can be completely independent from the others.

view-lesson - lesson-controls
  view-explanation
  view-example
  view-mcQuestion
  view-title

Each component is responsible for telling lesson service when it is "done" presenting,
which is how the lesson controls know that it's allowed to show the next button.

 */
