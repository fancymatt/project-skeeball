import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Howl } from 'howler';

import { Line } from '../line.model';
import { Vocab } from '../../vocab/vocab.model';
import { LineExample } from '../line-example';
import { AudioService } from '../../shared/audio.service';
import { LessonService } from '../../lessons/lesson.service';
import { VocabService } from '../../vocab/vocab.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

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
      transition('start => presented', animate('300ms ease-out')),
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
      transition('start => presented', animate('100ms 300ms ease-out')),
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
  @Input('line') genericLine: Line;
  @Input() currentLineIndex: number;
  line: LineExample = new LineExample;
  vocab: Vocab;
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
    if (!changes.genericLine.firstChange) {
      this.initialize();
    }
  }

  initialize() {
    this.initializeLine();
    this.initializeVocabulary();
    this.initializeAnimation();
  }

  initializeLine() {
    this.line.vocabReference = this.genericLine.exampleVocabReference;
  }

  initializeVocabulary() {
    this.vocabService.get(this.line.vocabReference)
      .subscribe(
        data => {
          this.vocab = data;
          if (this.vocab.childVocabs) {
            this.initializeChildVocabs(this.vocab.childVocabs);
          }
        },
        err => console.error(err)
      );
  }

  initializeAnimation() {
    this.textAnimationState = 'start';
    this.buttonAnimationState = 'start';
    setTimeout(() => {
      this.animateIn();
      this.initializeAudio();
    }, 1000);
  }

  initializeAudio() {
    const lessonAssets = this.lessonService.selectedLessonAssets;
    if (lessonAssets[this.currentLineIndex].audio) {
      this.audio = lessonAssets[this.currentLineIndex].audio;
      this.audio.pause();
      this.audio.play();
    }
  }

  animateIn() {
    this.textAnimationState = 'presented';
    this.buttonAnimationState = 'presented';
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
    let lastIndex = 0;
    this.targetTextElements = [];
    childVocabs.forEach((vocab, index) => {
      if (vocab.startChar > lastIndex) {
        this.targetTextElements.push({
          clickable: false,
          text: this.vocab.target.slice().substring(lastIndex, vocab.startChar),
          vocabRef: undefined
        });
      }
      this.targetTextElements.push({
        clickable: true,
        text: this.vocab.target.slice().substring(vocab.startChar, vocab.endChar),
        vocabRef: vocab.id
      });
      lastIndex = vocab.endChar;
    });
    if (lastIndex < this.vocab.target.length) {
      this.targetTextElements.push({
        clickable: false,
        text: this.vocab.target.slice().substring(lastIndex, this.vocab.target.length),
        vocabRef: undefined
      });
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
