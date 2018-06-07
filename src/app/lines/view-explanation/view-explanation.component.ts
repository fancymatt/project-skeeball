import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Line } from '../line.model';
import { LineExplanation } from '../line-explanation';
import { AudioService } from '../../shared/audio.service';

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
      transition('start => presented', animate('300ms 200ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ])
  ]
})

export class ViewExplanationComponent implements OnInit, OnChanges {
  @Input('line') genericLine: Line;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  currentLine: LineExplanation = new LineExplanation();
  textAnimationState: string;
  buttonAnimationState: string;

  constructor(private audioService: AudioService) { }

  ngOnInit() {
    this.mapGenericLineToLine(this.genericLine);
    this.initializeAnimation();
    this.initializeNarration();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.mapGenericLineToLine(changes.genericLine.currentValue);
    this.initializeAnimation();
    this.initializeNarration();
  }

  initializeAnimation() {
    this.textAnimationState = 'start';
    this.buttonAnimationState = 'start';
    setTimeout(() => {
      this.animateTextIn();
      this.playNarration();
    }, 1000);
  }

  initializeNarration() {
    if (this.audioService.currentLessonAudioFiles) {
      const audioFiles = this.audioService.currentLessonAudioFiles;
      const matchedAudio = audioFiles.find(audio => audio.url === this.currentLine.audioNarrationUrl);
      this.currentLine.audioNarration = matchedAudio.howl;
    }
  }

  mapGenericLineToLine(genericLine: Line) {
    this.currentLine.videoScript = genericLine.explanationVideoScript;
    this.currentLine.audioScript = genericLine.explanationAudioScript;
    this.currentLine.audioNarrationUrl = genericLine.explanationAudioMp3;
  }

  onDismissLine() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    this.playButtonClickSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);
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

  playNarration() {
    if (this.currentLine.audioNarration) {
      this.currentLine.audioNarration.pause(); // workaround for iOS bug
      this.currentLine.audioNarration.play();
      this.currentLine.audioNarration.on('end', () => {
        this.displayNextButton();
      });
    }
  }

}
