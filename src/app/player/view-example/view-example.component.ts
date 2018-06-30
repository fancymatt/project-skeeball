import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Howl } from 'howler';

import { LineExample } from '../../lines/line-example';
import { AudioService } from '../../shared/audio.service';
import { LessonService } from '../../lessons/lesson.service';
import { VocabService } from '../../vocab/vocab.service';

@Component({
  selector: 'app-view-example',
  templateUrl: './view-example.component.html',
  styleUrls: ['./view-example.component.css'],
  animations: [
    trigger('primaryTextAnimationState', [
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
      transition('presented => end', animate('100ms ease-out'))
    ]),
    trigger('secondaryTextAnimationState', [
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
      transition('presented => end', animate('100ms ease-out'))
    ]),
    trigger('buttonAnimationState', [
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
      transition('presented => end', animate('100ms ease-out'))
    ])
  ]
})
export class ViewExampleComponent implements OnInit, OnChanges {
  @Input() line: LineExample;
  targetTextElements: { clickable: boolean, text: string, vocabRef: string }[] = [];
  audio: Howl;
  textAnimationState: string;
  buttonAnimationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private audioService: AudioService,
              private lessonService: LessonService,
              private vocabService: VocabService,
              public childVocabDialog: MatDialog) {
  }

  ngOnInit() {
    this.initialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initialize();
  }

  initialize() {
    this.initializeVocabulary();
    this.initializeAnimation();
  }

  initializeVocabulary() {
    if (!this.line.vocab) {
      this.vocabService.get(this.line.vocabReference)
        .subscribe(
          data => {
            this.line.vocab = data;
            if (this.line.vocab.childVocabs) {
              this.initializeChildVocabs(this.line.vocab.childVocabs);
            }
            this.audio = this.audioService.initializeAudioFromFilePath(this.line.vocab.audioFilePathMp3);
          },
          err => console.error(err)
        );
    } else {
      if (this.line.vocab.childVocabs) {
        this.initializeChildVocabs(this.line.vocab.childVocabs);
      }
      this.audio = this.audioService.initializeAudioFromFilePath(this.line.vocab.audioFilePathMp3);
    }
  }

  initializeAnimation() {
    this.textAnimationState = 'start';
    this.buttonAnimationState = 'start';
    setTimeout(() => {
      this.animateIn();
    }, 1000);
  }

  animateIn() {
    this.textAnimationState = 'presented';
    this.buttonAnimationState = 'presented';
    this.audio.pause();
    this.audio.play();
  }

  animateOut() {
    this.textAnimationState = 'end';
    this.buttonAnimationState = 'end';
    this.playNeutralSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);
  }

  playNeutralSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

  initializeChildVocabs(childVocabs: any[]) {
    if (childVocabs) {
      let lastIndex = 0;
      this.targetTextElements = [];
      childVocabs.forEach((vocab, index) => {
        if (vocab.startChar > lastIndex) {
          this.targetTextElements.push({
            clickable: false,
            text: this.line.vocab.target.slice().substring(lastIndex, vocab.startChar),
            vocabRef: undefined
          });
        }
        this.targetTextElements.push({
          clickable: true,
          text: this.line.vocab.target.slice().substring(vocab.startChar, vocab.endChar),
          vocabRef: vocab.id
        });
        lastIndex = vocab.endChar;
      });
      if (lastIndex < this.line.vocab.target.length) {
        this.targetTextElements.push({
          clickable: false,
          text: this.line.vocab.target.slice().substring(lastIndex, this.line.vocab.target.length),
          vocabRef: undefined
        });
      }
    }
  }

  onClickChildVocab(vocabRef: string) {
    this.vocabService.get(vocabRef)
      .subscribe(
        data => this.childVocabDialog.open(DialogChildVocabComponent, {data: data}),
        err => console.error(err)
      );
  }
}

@Component({
  selector: 'app-dialog-child-vocab',
  templateUrl: '../../vocab/dialog-child-vocab/dialog-child-vocab.html'
})
export class DialogChildVocabComponent {
  constructor(public dialogRef: MatDialogRef<DialogChildVocabComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }
}
