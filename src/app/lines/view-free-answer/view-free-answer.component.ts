import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AudioService} from '../../shared/audio.service';
import {LineFreeAnswer} from '../line-free-answer';
import {Line} from '../line.model';
import {DataService} from '../../shared/data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-free-answer',
  templateUrl: './view-free-answer.component.html',
  styleUrls: ['./view-free-answer.component.css'],
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
      transition('start => presented', animate('100ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ]),
    trigger('textFieldState', [
      state('start', style({
        opacity: 0,
      })),
      state('empty', style({
        background: '#fff',
        padding: '2px'
      })),
      state('filled', style({
        background: '#ffe',
        padding: '2px 10px'
      })),
      state('correct', style({
        background: 'aliceblue',
        border: '2px solid black'
      })),
      state('end', style({
        opacity: 0
      }),
      transition('* => *', animate('100ms ease'))
    ])
  ]
})
export class ViewFreeAnswerComponent implements OnInit, OnChanges {

  @Input('line') genericLine: Line;
  @Input() currentLineIndex: number;
  line: LineFreeAnswer = new LineFreeAnswer();
  studentAnswer: string;
  textAnimationState: string;
  textFieldAnimationState: string;
  buttonAnimationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private audioService: AudioService, private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.initializeQuestion();
  }

  ngOnInit() {
    this.initializeQuestion();
  }

  initializeQuestion() {
    this.line.prompt = this.genericLine.freePrompt;
    this.dataService.getVocab(this.genericLine.freeVocabReference)
      .subscribe(
        data => this.line.answer = data,
        err => console.log(err)
      );
    this.initializeAnimation();
  }

  initializeAnimation() {
    this.textAnimationState = 'start';
    this.buttonAnimationState = 'start';
    this.textFieldAnimationState = 'start';
    setTimeout(() => {
      this.animateIn();
    }, 1000);
  }

  animateIn() {
    this.textAnimationState = 'presented';
    this.textFieldAnimationState = 'empty';

  }

  evaluateStudentAnswer() {
    if (this.studentAnswer.length > 0) {
      this.textFieldAnimationState = 'filled';
    } else {
      this.textFieldAnimationState = 'empty';
    }
    if (this.studentAnswer === this.line.answer.targetRomanization) {
      this.textFieldAnimationState = 'correct';
      this.showNextButton();
    }
  }

  showNextButton() {
    this.buttonAnimationState = 'presented';
  }

  onDismissLine() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    this.textFieldAnimationState = 'end';
    this.playButtonClickSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);
  }

  playButtonClickSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

}
