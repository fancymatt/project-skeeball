import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Line } from '../line.model';
import { LineExample } from '../line-example';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-view-example',
  templateUrl: './view-example.component.html',
  styleUrls: ['./view-example.component.css'],
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
export class ViewExampleComponent implements OnInit, OnChanges {
  @Input('line') genericLine: Line;
  line: LineExample = new LineExample;
  animationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor() { }

  mapGenericLineToLine(genericLine: Line) {
    this.line.exampleTarget = genericLine.exampleTarget;
    this.line.exampleKana = genericLine.exampleKana;
    this.line.exampleRomanization = genericLine.exampleRomanization;
    this.line.exampleEnglish = genericLine.exampleEnglish;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.mapGenericLineToLine(changes.genericLine.currentValue);
    this.initializeAnimation();
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
