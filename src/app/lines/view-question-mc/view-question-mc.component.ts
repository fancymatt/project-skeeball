import { Component, Input, OnInit } from '@angular/core';
import { Line } from '../line.model';
import { LineQuestionMc } from '../line-question-mc';

@Component({
  selector: 'app-view-question-mc',
  templateUrl: './view-question-mc.component.html',
  styleUrls: ['./view-question-mc.component.css']
})
export class ViewQuestionMcComponent implements OnInit {

  @Input('line') genericLine: Line;
  line: LineQuestionMc = new LineQuestionMc();
  options: {text: string, correct: boolean, selected: boolean}[] = [];

  constructor() { }

  ngOnInit() {
    this.line.question = this.genericLine.mcQuestion;
    this.line.answerCorrect = this.genericLine.mcAnswerCorrect;
    this.line.answerIncorrect = [];
    this.line.answerIncorrect.push(this.genericLine.mcAnswerIncorrect1);
    this.line.answerIncorrect.push(this.genericLine.mcAnswerIncorrect2);
    this.line.answerIncorrect.push(this.genericLine.mcAnswerIncorrect3);
    this.initializeOptions();
  }

  initializeOptions(): void {
    this.options.push({text: this.line.answerCorrect, correct: true, selected: false});
    for (let i = 0; i < this.line.answerIncorrect.length; i++) {
      this.options.push({text: this.line.answerIncorrect[i], correct: false, selected: false});
    }
    this.shuffleArray(this.options);
  }

  onClickOption(selectedOption: {text: string, correct: boolean, selected: boolean}): void {
    if (selectedOption.correct) {
      this.options = [];
      console.log('You are correct!');
    }
    selectedOption.selected = true;
  }


  shuffleArray(array): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
