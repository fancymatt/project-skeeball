import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Line } from '../line.model';
import { LineQuestionMc } from '../line-question-mc';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-question-mc',
  templateUrl: './view-question-mc.component.html',
  styleUrls: ['./view-question-mc.component.css'],
  animations: [
    trigger('primaryTextState', [
      state('start', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      state('presented', style({
        opacity: 1,
        transform: 'translateY(0px)'
      })),
      state('end', style({
        opacity: 0,
        transform: 'translateY(-10px)'
      })),
      transition('start => presented', animate('300ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ]),
    trigger('secondaryTextState', [
      state('start', style({
        opacity: 0
      })),
      state('presented', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start => presented', animate('100ms 300ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ]),
    trigger('buttonState', [
      state('start', style({
        opacity: 0
      })),
      state('presented', style({
        opacity: 1
      })),
      state('end', style({
        opacity: 0
      })),
      transition('start => presented', animate('100ms 1500ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ])
  ]
})
export class ViewQuestionMcComponent implements OnInit, OnChanges {

  @Input('line') genericLine: Line;
  line: LineQuestionMc = new LineQuestionMc();
  options: {text: string, correct: boolean, selected: boolean}[];
  animationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.mapGenericLineToLine(changes.genericLine.currentValue);
    this.initializeAnimation();
  }

  ngOnInit() {
    this.mapGenericLineToLine(this.genericLine);
    this.initializeAnimation();
  }

  mapGenericLineToLine(genericLine: Line) {
    this.line.question = genericLine.mcQuestion;
    this.line.answerCorrect = genericLine.mcAnswerCorrect;
    this.line.answerIncorrect = [];
    this.line.answerIncorrect.push(genericLine.mcAnswerIncorrect1);
    this.line.answerIncorrect.push(genericLine.mcAnswerIncorrect2);
    this.line.answerIncorrect.push(genericLine.mcAnswerIncorrect3);
    this.initializeOptions();
  }

  initializeOptions(): void {
    this.options = [];
    this.options.push({text: this.line.answerCorrect, correct: true, selected: false});
    for (let i = 0; i < this.line.answerIncorrect.length; i++) {
      this.options.push({text: this.line.answerIncorrect[i], correct: false, selected: false});
    }
    this.shuffleArray(this.options);
  }

  onClickOption(selectedOption: {text: string, correct: boolean, selected: boolean}): void {
    if (selectedOption.correct) {
      this.options = [];
      this.animateOut();
    }
    selectedOption.selected = true;
  }

  shuffleArray(array): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  initializeAnimation() {
    this.animationState = 'start';
    setTimeout(() => {
      this.animateIn();
    }, 1000);
  }

  animateIn() {
    this.animationState = 'presented';
  }

  animateOut() {
    this.animationState = 'end';
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);

  }

}
