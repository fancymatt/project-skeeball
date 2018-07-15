import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { ISubscription } from 'rxjs-compat/Subscription';

import { LessonService } from '../services/lesson.service';
import { Line } from '../models/line.model';
import { LineExampleModel } from '../models/line-example.model';
import { LineExplanationModel } from '../models/line-explanation.model';
import { LineQuestionMcModel } from '../models/line-question-mc.model';
import { SkillService } from '../services/skill.service';
import { Level } from '../models/level.model';
import { AudioService } from '../services/audio.service';
import { VocabService } from '../services/vocab.service';
import { Task } from '../models/task.model';
import { Lesson } from '../models/lesson.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  animations: [
    trigger('bgState', [
      state('dark', style({
        'color': '#fff',
        'backgroundColor': '#006fde'
      })),
      state('light', style({
        'color': '#000',
        'backgroundColor': '#fff'
      })),
      transition('* => *', animate('100ms ease-out'))
    ]),
    trigger('controlsState', [
      state('dark', style({
        'color': '#fff',
      })),
      state('light', style({
        'color': '#000',
      })),
      transition('* => *', animate('100ms ease-out'))
    ])
  ]
})
export class PlayerComponent implements OnInit {
  @Input() content: any[];
  /*
  Expects array of lessons or skills in format
  [
    {'type': 'lesson', 'id': 'lesson_id'},
    {'type': 'skill', 'skillId': 'skill_id', 'levelId': 'level_id'},
    {'type': 'task', 'skillId': 'skill_id', 'levelId':, 'level_id', 'taskId': 'task_id}
  ]
   */

  loadedPlayerContents: any[];
  currentItem = 0;
  done = false;
  private nextTask = 0;
  bgState: string;
  contentsLoaded = false;
  private queue: string[];
  private listenToAdvanceEvent = true;
  private loopSubscription: ISubscription;

  constructor(private lessonService: LessonService,
              private audioService: AudioService,
              private vocabService: VocabService,
              private skillService: SkillService,
              private router: Router) { }

  ngOnInit() {
    this.initializeContent();
  }

  initializeContent() {
    this.loadedPlayerContents = [];
    this.queue = [];
    this.queue[0] = 'ready';
    this.loopSubscription = interval(100)
      .subscribe(() => this.attemptNextQueueItem());
  }

  performCurrentQueueItem() {
    const contentItem = this.content[this.nextTask];
    switch (contentItem.type) {
      case 'lesson':
        this.initializeLesson(contentItem.id);
        break;
      case 'skill':
        this.initializeSkill(contentItem.skillId, contentItem.levelId);
        break;
      case 'task':
        this.initializeTask(contentItem.skillId, contentItem.levelId, contentItem.taskId);
        break;
      default:
        console.error('Error initializing content: Item was an unknown type.');
    }
  }

  // Initialization for the contents array

  initializeLesson(lessonId: string) {
    if (lessonId) {
      this.lessonService.get(lessonId)
        .subscribe(
          lesson => {
            this.initializeLessonTitleScreen(lesson);
            lesson.lines.forEach(line => {
              this.initializeLine(line);
            });
            if (lesson.type === 'Vocabulary') {
              this.initializeVocabularyQuiz(lesson);
            }
        },
          err => console.error('There was an error fetching lesson contents: ' + err),
        () => this.enableNextTaskInQueue()
        );
    } else {
      console.error('Lesson did not have an id set.');
    }
  }

  initializeLessonTitleScreen(lesson: Lesson) {
    this.loadedPlayerContents.push({type: 'lessonTitle', content: lesson});
  }

  initializeVocabularyQuiz(lesson: Lesson) {
    this.loadedPlayerContents.push({type: 'vocabQuiz', content: lesson});
  }

  // Lines

  initializeLine(line: Line) {
    switch (line.type) {
      case 'Example':
        this.initializeLineExample(line);
        break;
      case 'Explanation':
        this.initializeLineExplanation(line);
        break;
      case 'Multiple Choice':
        this.initializeLineMultipleChoice(line);
        break;
      default:
        console.error('Line could not be initialized. Type was invalid.');
        console.log(line);
    }
  }

  initializeLineExample(line: Line) {
    const newExample = new LineExampleModel();
    newExample.vocabReference = line.exampleVocabReference;
    this.vocabService.get(line.exampleVocabReference)
      .subscribe(data => newExample.vocab = data);
    this.loadedPlayerContents.push({type: 'lineExample', content: newExample});
  }

  initializeLineExplanation(line: Line) {
    const newExplanation = new LineExplanationModel();
    newExplanation.audioNarration = this.audioService.initializeAudioFromFilePath(line.explanationAudioMp3);
    newExplanation.audioScript = line.explanationAudioScript;
    newExplanation.videoScript = line.explanationVideoScript;
    this.loadedPlayerContents.push({type: 'lineExplanation', content: newExplanation});
  }

  initializeLineMultipleChoice(line: Line) {
    const newMultipleChoice = new LineQuestionMcModel();
    newMultipleChoice.question = line.mcQuestion;
    newMultipleChoice.answerCorrect = line.mcAnswerCorrect;
    newMultipleChoice.answerIncorrect = [];
    newMultipleChoice.answerIncorrect.push(line.mcAnswerIncorrect1);
    newMultipleChoice.answerIncorrect.push(line.mcAnswerIncorrect2);
    newMultipleChoice.answerIncorrect.push(line.mcAnswerIncorrect3);
    this.loadedPlayerContents.push({type: 'lineMultipleChoice', content: newMultipleChoice});
  }

  initializeSkill(skillId: string, levelId: string) {
    if (skillId) {
      this.skillService.get(skillId)
        .subscribe(
          skill => {
            const matchedLevel: Level = skill.levels.find(level => level.id === levelId);
            matchedLevel.tasks.forEach(task => {
              this.loadedPlayerContents.push({type: 'task', content: task, parentSkill: skill});
            });
          },
          err => console.error('Error getting skill: ' + err),
          () => this.enableNextTaskInQueue()
        );
    } else {
      console.error('Requested skill but proper ids were not set.');
    }
  }

  initializeTask(skillId: string, levelId: string, taskId: string) {
    if (skillId && levelId && taskId) {
      this.skillService.get(skillId)
        .subscribe(
          skill => {
            const matchedLevel: Level = skill.levels.find(level => level.id === levelId);
            const matchedTask: Task = matchedLevel.tasks.find(task => task.id === taskId);
            this.loadedPlayerContents.push({type: 'task', content: matchedTask, parentSkill: skill});
          }, err => console.error('Error getting skill: ' + err),
          () => this.enableNextTaskInQueue()
        );
    } else {
      console.error('Requested task but proper ids were not set.');
    }
  }

  // Loading and navigation

  enableNextTaskInQueue() {
    this.queue[this.nextTask] = 'done';
    if (this.nextTask < this.content.length - 1) {
      this.nextTask++;
      this.queue[this.nextTask] = 'ready';
    } else {
      this.contentsLoaded = true;
      this.checkStyles();
      this.loopSubscription.unsubscribe();
    }
  }

  attemptNextQueueItem() {
    if (this.queue[this.nextTask] === 'ready') {
      this.queue[this.nextTask] = 'working';
      this.performCurrentQueueItem();
    }
  }

  onAdvance(): void {
    if (this.currentItem >= this.loadedPlayerContents.length - 1) {
      this.done = true;
      this.router.navigate(['/next']);
      return;
    }
    if (this.listenToAdvanceEvent) { // prevents event bubbling
      this.listenToAdvanceEvent = false;
      this.currentItem++;
      this.checkStyles();
      setTimeout(() => {
        this.listenToAdvanceEvent = true;
      }, 100);
    }
  }

  onReverse(): void {
    if (this.currentItem === 0) {
      this.router.navigate(['/next']);
      return;
    }
    if (this.listenToAdvanceEvent) {
      this.listenToAdvanceEvent = false;
      this.currentItem--;
      this.checkStyles();
      setTimeout(() => {
        this.listenToAdvanceEvent = true;
      }, 100);
    }
  }

  checkStyles(): void {
    if (this.loadedPlayerContents[this.currentItem].type === 'lessonTitle') {
      this.bgState = 'dark';
    } else {
      this.bgState = 'light';
    }
  }

}
