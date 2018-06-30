import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Task } from '../task.model';
import { Objective } from '../objective.model';
import { ObjectiveService } from '../objective.service';
import { VocabService } from '../../vocab/vocab.service';

@Component({
  selector: 'app-challenge-task',
  templateUrl: './challenge-task.component.html',
  styleUrls: ['./challenge-task.component.css']
})
export class ChallengeTaskComponent implements OnInit, OnChanges {
  @Input() task: Task;
  @Output() dismissTask: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  taskVocabulary: any[];
  currentQuestion: any[];
  correctAnswer: string;
  studentAnswer: string;
  toLoad: number;
  loaded: number;
  isCorrect = false;

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
    this.populateTaskVocabulary();
    this.studentAnswer = '';
    this.correctAnswer = '';

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

  evaluateStudentAnswer() {
    const guess = this.studentAnswer.replace(/\s/g, '');
    const actual = this.correctAnswer.replace(/\s/g, '');
    if (guess === actual) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

  onDismissTask() {
    this.dismissTask.emit(true);
  }

}
