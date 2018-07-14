import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AudioService } from '../../services/audio.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-player-play-lesson-title',
  templateUrl: './player-play-lesson-title.component.html',
  styleUrls: ['./player-play-lesson-title.component.css'],
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
      transition('start => presented', animate('100ms ease-out')),
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
      transition('start => presented', animate('100ms ease-out')),
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
    ])
  ]
})

export class PlayerPlayLessonTitleComponent implements OnInit, OnChanges {
  @Input() lesson: Lesson;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  textAnimationState: string;
  buttonAnimationState: string;
  autoplay = false;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize();
  }

  initialize() {
    this.initializeAnimation();
  }

  initializeAnimation() {
    this.textAnimationState = 'start';
    this.buttonAnimationState = 'start';
    setTimeout(() => {
      this.animateTextIn();
    }, 1000);
  }

  onDismissLine() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    this.playButtonClickSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 2000);
  }

  displayNextButton() {
    this.buttonAnimationState = 'presented';
  }

  animateTextIn() {
    this.textAnimationState = 'presented';
  }

  playButtonClickSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

  advanceToNextLine() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);

  }

}
