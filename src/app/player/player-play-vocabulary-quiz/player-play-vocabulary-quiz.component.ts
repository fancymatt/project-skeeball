
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import 'rxjs-compat/add/operator/takeWhile';
import { ISubscription } from 'rxjs-compat/Subscription';

import { VocabService } from '../../services/vocab.service';
import { Lesson } from '../../models/lesson.model';
import { Vocab } from '../../models/vocab.model';

@Component({
  selector: 'app-player-play-vocabulary-quiz',
  templateUrl: './player-play-vocabulary-quiz.component.html',
  styleUrls: ['./player-play-vocabulary-quiz.component.css']
})
export class PlayerPlayVocabularyQuizComponent implements OnInit, OnChanges {
  @Input() lesson: Lesson;
  @Output() dismiss: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  requiredSuccessesPerVocab = 2;
  lessonVocabulary: {vocab: Vocab, successes: number}[];
  currentVocabulary: Vocab;
  lastIndex: number;
  currentIndex: number;
  studentAnswer: string;
  isCorrect: boolean;
  isSubmitted: boolean;
  vocabQuizComplete: boolean;
  toLoad: number;
  loaded: number;
  fullyLoaded: boolean;
  loopSubscription: ISubscription;

  constructor(private activatedRoute: ActivatedRoute,
              private vocabService: VocabService) { }

  ngOnInit() {
    this.initialize();
  }

  ngOnChanges() {
    this.initialize();
  }

  initialize() {
    this.toLoad = 0;
    this.loaded = 0;
    this.currentIndex = -1;
    this.lastIndex = -1;
    this.vocabQuizComplete = false;
    this.isCorrect = false;
    this.fullyLoaded = false;
    this.isSubmitted = false;
    this.loadLessonVocabulary();
    this.studentAnswer = '';
    this.loopSubscription = interval(100)
      .takeWhile(() => !this.fullyLoaded)
      .subscribe(() => this.checkLoadStatus());
  }

  loadLessonVocabulary() {
    this.lessonVocabulary = [];
    this.lesson.lines.forEach(line => {
      if (line.exampleVocabReference) {
        this.toLoad++;
        this.vocabService.get(line.exampleVocabReference)
          .subscribe(
            data => {
              this.lessonVocabulary.push({vocab: data, successes: 0});
              this.loaded++;
            },
            err => console.error(err)
          );
      }
    });
  }

  chooseNewVocabulary() {
    this.isSubmitted = false;
    this.isCorrect = false;
    this.studentAnswer = '';
    this.lastIndex = this.currentIndex;
    this.currentIndex = Math.floor(Math.random() * this.lessonVocabulary.length);

    if (this.currentIndex === this.lastIndex) { this.chooseNewVocabulary(); }
    if (this.lessonVocabulary[this.currentIndex].successes >= this.requiredSuccessesPerVocab) {
      this.countSuccesses();
      if (this.vocabQuizComplete) {
        this.dismiss.emit(true);
      } else {
        this.chooseNewVocabulary();
      }
    }
    this.currentVocabulary = this.lessonVocabulary[this.currentIndex].vocab;
  }

  checkLoadStatus() {
    if (this.loaded >= this.toLoad) {
      this.fullyLoaded = true;
      this.chooseNewVocabulary();
    }
  }

  countSuccesses() {
    let totalSuccesses = 0;
    this.lessonVocabulary.forEach(vocab => {
      totalSuccesses += vocab.successes;
    });
    if (totalSuccesses >= this.lessonVocabulary.length * this.requiredSuccessesPerVocab) {
      this.vocabQuizComplete = true;
    }
  }

  checkAnswer() {
    this.isSubmitted = true;
    const guess = this.studentAnswer.replace(/\s/g, '');
    const actual = this.currentVocabulary.targetRomanization.replace(/\s/g, '');
    if (guess === actual) {
      this.lessonVocabulary[this.currentIndex].successes++;
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }
  onDismiss() {
    this.dismiss.emit(true);
  }

  handleEnterPress() {
    if (this.isSubmitted) {
      this.chooseNewVocabulary();
    } else {
      this.checkAnswer();
    }
  }

}
