import { Component, Input, OnInit } from '@angular/core';
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
export class ChallengeTaskComponent implements OnInit {
  @Input() challengingObjective: Objective;
  @Input() challengingTask: Task;
  taskVocabulary: any[];
  currentQuestion: any[];
  currentAnswer: string;
  studentAnswer: string;
  isCorrect = false;

  constructor(private activatedRoute: ActivatedRoute,
              private vocabService: VocabService,
              private objectiveService: ObjectiveService) { }

  ngOnInit() {
    this.initializeTask();
  }

  initializeTask() {
    if (!this.challengingObjective) {
      const objectiveId = this.activatedRoute.snapshot.params.obj_id;
      const taskId = this.activatedRoute.snapshot.params.task_id;
      this.objectiveService.get(objectiveId)
        .subscribe(data => {
            this.challengingObjective = data;
            this.challengingObjective.levels.forEach(level => {
              level.tasks.forEach(task => {
                if (task.id === taskId) {
                  this.challengingTask = task;
                  this.initializeTaskVocabulary();
                }
              });
            });
        },
            err => console.error(err));
    };
  }

  initializeTaskVocabulary() {
    this.taskVocabulary = [];
    this.challengingTask.pattern.forEach((pattern, index) => {
      this.taskVocabulary[index] = [];
      if (pattern.wordBank) {
        pattern.wordBank.forEach(id => {
          this.vocabService.get(id)
            .subscribe(data => this.taskVocabulary[index].push(data),
              err => console.error(err));
        });
      } else if (pattern.staticVocabRef) {
        this.vocabService.get(pattern.staticVocabRef)
          .subscribe(data => this.taskVocabulary[index].push(data),
          err => console.error(err));
      }
    });
  }

  createRandomQuestion() {
    this.studentAnswer = '';
    this.isCorrect = false;
    this.currentQuestion = [];
    this.taskVocabulary.forEach((patternItem, index) => {
      if (patternItem.length > 1) { // static only has 1 length
        this.currentQuestion.push(patternItem[Math.floor(Math.random() * patternItem.length)]);
      } else {
        this.currentQuestion.push(['']);
      }
    });

    this.currentAnswer = '';
    this.challengingTask.pattern.forEach((pattern, index) => {
      if (pattern.type === 'Slot') {
        this.currentAnswer += this.currentQuestion[index].targetRomanization;
      }
      if (pattern.type === 'Static') {
        this.currentAnswer += this.taskVocabulary[index][0].targetRomanization;
      }
      this.currentAnswer += ' ';
    });

  }

  evaluateStudentAnswer() {
    const guess = this.studentAnswer.replace(/\s/g, '');
    const actual = this.currentAnswer.replace(/\s/g, '');
    if (guess === actual) {
      this.isCorrect = true;
    } else {
      this.isCorrect = false;
    }
  }

}
