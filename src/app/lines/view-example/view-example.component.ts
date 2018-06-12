import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Line } from '../line.model';
import { LineExample } from '../line-example';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Howl } from 'howler';
import { AudioService } from '../../shared/audio.service';
import { Vocab } from '../../vocab/vocab.model';
import { DataService } from '../../shared/data.service';

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
  vocab: Vocab;
  audio: Howl;
  animationState: string;
  @Output() dismissLine: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  constructor(private audioService: AudioService,
              private dataService: DataService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.genericLine.firstChange) {
      this.initializeExample();
    }
    this.initializeAnimation();
  }

  ngOnInit() {
    this.initializeExample();
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
    this.playNeutralSound();
    setTimeout(() => {
      this.dismissLine.emit(true);
    }, 1000);
  }

  mapGenericLineToLine() {
    this.line.vocabReference = this.genericLine.exampleVocabReference;
  }

  initializeAudio() {
    const audioFiles = this.audioService.currentLessonAudioFiles;
    const matchedAudio = audioFiles.find(audio => audio.url === this.vocab.audioFilePathMp3);
    if (matchedAudio) {
      this.audio = matchedAudio.howl;
      this.audio.pause();
      this.audio.play();
    }
  }

  playNeutralSound() {
    this.audioService.buttonClickSound.pause();
    this.audioService.buttonClickSound.play();
  }

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
            for (let i = 0; i < this.vocab.childVocabs.length; i++) {
              console.log('Substring of ' + targetString + ' from ' + this.vocab.childVocabs[i].startChar + ' to ' +  this.vocab.childVocabs[i].endChar );
              string += targetString.substring(this.vocab.childVocabs[i].startChar, this.vocab.childVocabs[i].endChar);
              string += ' [' + this.vocab.childVocabs[i].id + '], ';
            }
            console.log(string);
            this.vocab.target = string;
          }
          this.initializeAudio();
        },
        (err) => console.log(err),
        () => console.log('Finished fetching vocab entry')
      );

  }

}
