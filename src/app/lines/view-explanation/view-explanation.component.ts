import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Line } from '../line.model';
import { LineExplanation } from '../line-explanation';

@Component({
  selector: 'app-view-explanation',
  templateUrl: './view-explanation.component.html',
  styleUrls: ['./view-explanation.component.css'],
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
export class ViewExplanationComponent implements OnInit, OnChanges {
  @Input('line') genericLine: Line;
  line: LineExplanation = new LineExplanation();
  animationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.mapGenericLineToLine(changes.genericLine.currentValue);
    this.initializeAnimation();
  }

  mapGenericLineToLine(genericLine: Line) {
    this.line.videoScript = genericLine.explanationVideoScript;
    this.line.audioScript = genericLine.explanationAudioScript;
  }

  ngOnInit() {
    this.mapGenericLineToLine(this.genericLine);
    this.initializeAnimation();
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
