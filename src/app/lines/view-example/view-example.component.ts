import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Line } from '../line.model';
import { LineExample } from '../line-example';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Howl } from 'howler';
import { AudioService } from '../../shared/audio.service';
import { Vocab } from '../../vocab/vocab.model';
import { DataService } from '../../shared/data.service';
import { LessonService } from '../../lessons/lesson.service';

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
      transition('start => presented', animate('300ms 200ms ease-out')),
      transition('presented => end' , animate('100ms ease-out'))
    ])
  ]
})
export class ViewExampleComponent implements OnInit, OnChanges {
  @Input('line') genericLine: Line;
  @Input() currentLineIndex: number;
  line: LineExample = new LineExample;
  vocab: Vocab;
<<<<<<< HEAD
  vocabAudio: Howl;
=======
  targetTextElements: {clickable: boolean, text: string}[] = [];
  audio: Howl;
>>>>>>> ec8a3723dfe108888f7919f0417bc59ccc42aa4f
  animationState: string;
  buttonAnimationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private audioService: AudioService,
              private dataService: DataService,
              private lessonService: LessonService) { }

  ngOnChanges(changes: SimpleChanges) {
<<<<<<< HEAD
    this.initializeExample();
=======
    if (!changes.genericLine.firstChange) {
      this.initializeExample();
    }
    this.initializeAnimation();
>>>>>>> ec8a3723dfe108888f7919f0417bc59ccc42aa4f
  }

  ngOnInit() {
    this.initializeExample();
  }

  initializeExample() {
    this.line.vocabReference = this.genericLine.exampleVocabReference;
    this.vocabAudio = this.lessonService.selectedLessonAssets[this.currentLineIndex].audio;
    this.vocab = this.lessonService.selectedLessonAssets[this.currentLineIndex].vocabulary;
    this.initializeAnimation();
  }

  initializeAnimation() {
    this.buttonAnimationState = 'start';
    this.animationState = 'start';
    setTimeout(() => {
      this.animateIn();
    }, 1000);
  }

  animateIn() {
    this.animationState = 'presented';
    this.playExampleAudio();
  }

  animateOut() {
    this.animationState = 'end';
    this.buttonAnimationState = 'end';
    this.playNeutralSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);
  }

  playExampleAudio() {
    if (this.vocabAudio) {
      this.vocabAudio.pause();
      this.vocabAudio.play();
      this.vocabAudio.on('end', () => {
        this.displayNextButton();
      });
    }
  }

  displayNextButton() {
    this.buttonAnimationState = 'presented';
  }

  playNeutralSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

<<<<<<< HEAD
=======
  initializeExample() {
    this.mapGenericLineToLine();
    console.log(this.line);
    this.dataService.getVocab(this.line.vocabReference)
      .subscribe(
        (data) => {
          const targetString = data.target;
          this.vocab = data;
          if (this.vocab.childVocabs) {
            let string = '';
            let lastIndex = 0;
            for (let i = 0; i < this.vocab.childVocabs.length; i++) {
              if (this.vocab.childVocabs[i].startChar > lastIndex) {
                this.targetTextElements.push({
                  clickable: false,
                  text: targetString.substring(lastIndex, this.vocab.childVocabs[i].startChar)
                });
              }
              this.targetTextElements.push({
                clickable: true,
                text: targetString.substring(this.vocab.childVocabs[i].startChar, this.vocab.childVocabs[i].endChar)
              });
              lastIndex = this.vocab.childVocabs[i].endChar;
            }
            console.log(this.targetTextElements);
          }
          this.initializeAudio();
        },
        (err) => console.log(err),
        () => console.log('Finished fetching vocab entry')
      );

  }

>>>>>>> ec8a3723dfe108888f7919f0417bc59ccc42aa4f
}
