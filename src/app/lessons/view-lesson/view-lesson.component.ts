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
  options: {text: string, correct: boolean, selected: boolean}[] = [];
  preventAdvance: boolean;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.currentLesson = this.lessonService.selectedLesson;
    this.currentLineIndex = 0;
    this.currentLine = this.lessonService.selectedLesson.lines[this.currentLineIndex];
    this.totalLines = this.currentLesson.lines.length;
    this.handleMultipleChoice();
  }

  advanceToNextLine() {
    if (this.currentLineIndex < this.totalLines - 1) {
      this.currentLineIndex++;
      this.currentLine = this.currentLesson.lines[this.currentLineIndex];
      this.handleMultipleChoice();
    }
  }

  advanceToPreviousLine() {
    if (this.currentLineIndex > 0) {
      this.currentLineIndex--;
      this.currentLine = this.currentLesson.lines[this.currentLineIndex];
      this.handleMultipleChoice();
    }
  }

  handleMultipleChoice(): void {
    if (this.currentLine.type !== 'Multiple Choice') { return; }

    this.options.push({text: this.currentLine.mcAnswerCorrect, correct: true, selected: false});
    this.options.push({text: this.currentLine.mcAnswerIncorrect1, correct: false, selected: false});
    this.options.push({text: this.currentLine.mcAnswerIncorrect2, correct: false, selected: false});
    this.options.push({text: this.currentLine.mcAnswerIncorrect3, correct: false, selected: false});

    this.shuffleArray(this.options);
    this.preventAdvance = true;
  }

  onClickOption(selectedOption: {text: string, correct: boolean, selected: boolean}) {
    if (selectedOption.correct) {
      this.preventAdvance = false;
      this.options = [];
      this.advanceToNextLine();
    }
    selectedOption.selected = true;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


}
