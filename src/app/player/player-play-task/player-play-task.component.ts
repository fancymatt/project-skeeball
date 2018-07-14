import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../../models/task.model';
import { VocabService } from '../../services/vocab.service';
import { interval, Observable } from 'rxjs';
import 'rxjs-compat/add/operator/takeWhile';
import { ISubscription } from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-challenge-task',
  templateUrl: './player-play-task.component.html',
  styleUrls: ['./player-play-task.component.css']
})
export class PlayerPlayTaskComponent implements OnInit, OnChanges {
  @Input() task: Task;
  @Output() dismissTask: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  taskVocabulary: any[];
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
    this.populateTaskVocabulary();
    if (this.taskVocabulary.length > 1) {
      this.successesRequired = 5l;
    } else {
      this.successesRequired = 1;
    }
    this.studentAnswer = '';
    this.correctAnswer = '';
    this.loopSubscription = interval(100)
      .takeWhile(() => !this.fullyLoaded)
      .subscribe(() => this.checkLoadStatus());
  }

  populateTaskVocabulary() {
    this.taskVocabulary = [];
    this.task.pattern.forEach((pattern, index) => {
      this.taskVocabulary[index] = [];
      if (pattern.wordBank) {
        this.populateTaskVocabularyForSlot(index, pattern.wordBank);
      }
      if (pattern.staticVocabRef) {
        this.populateTaskVocabularyForStatic(index, pattern.staticVocabRef);
      }
    });
  }

  populateTaskVocabularyForSlot(index: number, wordBank: string[]) {
    this.toLoad += wordBank.length;
    wordBank.forEach(id => {
      this.vocabService.get(id)
        .subscribe(data => {
          this.taskVocabulary[index].push(data);
          this.loaded += 1;
        });
    });
  }

  populateTaskVocabularyForStatic(index: number, id: string) {
    this.toLoad += 1;
    this.vocabService.get(id)
      .subscribe(data => {
        this.taskVocabulary[index][0] = data;
        this.loaded += 1;
      });
  }

  initializeQuestion() {
    this.isCorrect = false;
    this.isSubmitted = false;
    this.studentAnswer = '';
    this.currentQuestion = [];
    this.taskVocabulary.forEach((patternItem, index) => {
      if (patternItem.length > 1) { // static only has 1 length
        this.currentQuestion.push(patternItem[Math.floor(Math.random() * patternItem.length)]);
      }
    });
    this.initializeAnswer();
  }

  initializeAnswer() {
    this.correctAnswer = '';
    this.task.pattern.forEach((pattern, index) => {
      if (pattern.type === 'Static') {
        this.correctAnswer += this.taskVocabulary[index][0].targetRomanization;
      }
      if (pattern.type === 'Slot') {
        this.correctAnswer += this.currentQuestion[index].targetRomanization;
      }
    });
  }

  checkLoadStatus() {
    if (this.loaded >= this.toLoad) {
      this.fullyLoaded = true;
      this.initializeQuestion();
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

  onDismissTask() {
    this.dismissTask.emit(true);
  }

}
