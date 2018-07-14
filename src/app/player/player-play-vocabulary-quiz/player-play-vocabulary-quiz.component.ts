
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
  lessonVocabulary: Vocab[];
  currentQuestion: any[];
  correctAnswer: string;
  studentAnswer: string;
  successesRequired: number;
  successesEarned: number;
  toLoad: number;
  loaded: number;
  fullyLoaded: boolean;
  isCorrect: boolean;
  isSubmitted: boolean;
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
    this.isCorrect = false;
    this.fullyLoaded = false;
    this.isSubmitted = false;
    this.successesEarned = 0;
    this.loadLessonVocabulary();
    if (this.lessonVocabulary.length > 1) {
      this.successesRequired = 5;
    } else {
      this.successesRequired = 1;
    }
    this.studentAnswer = '';
    this.correctAnswer = '';
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
              this.lessonVocabulary.push(data);
              this.loaded++;
            },
            err => console.error(err)
          );
      }
    });
  }

  checkLoadStatus() {
    if (this.loaded >= this.toLoad) {
      this.fullyLoaded = true;
    }
  }

  checkAnswer() {
    this.isSubmitted = true;
    const guess = this.studentAnswer.replace(/\s/g, '');
    const actual = this.correctAnswer.replace(/\s/g, '');
    if (guess === actual) {
      this.successesEarned++;
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }
  onDismiss() {
    this.dismiss.emit(true);
  }

}
