import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {Lesson} from '../lesson.model';
import {LessonService} from '../lesson.service';
import {Line} from '../../lines/line.model';

@Component({
  selector: 'app-view-lesson',
  templateUrl: './view-lesson.component.html',
  styleUrls: ['./view-lesson.component.css'],
  animations: [
    trigger('transitionPresentTextState', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('1000ms ease-out')),
      transition('void => in', animate('1000ms ease-out'))
    ])
  ]
})
export class ViewLessonComponent implements OnInit {
  currentLesson: Lesson;
  currentLineIndex: number;
  totalLines: number;
  currentLine: Line;
  mcOptions: {text: string, correct: boolean, selected: boolean}[] = [];
  preventAdvance: boolean;
  isTransitioningBetweenLines = 'in';

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.currentLesson = this.lessonService.selectedLesson;
    this.currentLineIndex = 0;
    this.currentLine = this.lessonService.selectedLesson.lines[this.currentLineIndex];
    this.totalLines = this.currentLesson.lines.length;
    this.handleMultipleChoice();
  }


  handleMultipleChoice(): void {
    if (this.currentLine.type !== 'Multiple Choice') { return; }

    this.mcOptions.push({text: this.currentLine.mcAnswerCorrect, correct: true, selected: false});
    this.mcOptions.push({text: this.currentLine.mcAnswerIncorrect1, correct: false, selected: false});
    this.mcOptions.push({text: this.currentLine.mcAnswerIncorrect2, correct: false, selected: false});
    this.mcOptions.push({text: this.currentLine.mcAnswerIncorrect3, correct: false, selected: false});

    this.shuffleArray(this.mcOptions);
    this.preventAdvance = true;
  }

  onClickOption(selectedOption: {text: string, correct: boolean, selected: boolean}) {
    if (selectedOption.correct) {
      this.preventAdvance = false;
      this.mcOptions = [];
    }
    selectedOption.selected = true;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  transitionToLine(nextLineIndex: number) {
    if (nextLineIndex > 0 && nextLineIndex < this.totalLines) {
      this.isTransitioningBetweenLines = 'out';
      setTimeout(() => {
        this.currentLineIndex = nextLineIndex;
        this.currentLine = this.currentLesson.lines[nextLineIndex];
        this.handleMultipleChoice();
        this.isTransitioningBetweenLines = 'in';
      }, 1000);
    }
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

 */
