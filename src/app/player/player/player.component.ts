import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { ISubscription } from 'rxjs-compat/Subscription';

import { LessonService } from '../../lessons/lesson.service';
import { Line } from '../../lines/line.model';
import { LineExample } from '../../lines/line-example';
import { LineExplanation } from '../../lines/line-explanation';
import { LineQuestionMc } from '../../lines/line-question-mc';
import { ObjectiveService } from '../../objectives/objective.service';
import { Level } from '../../objectives/level.model';
import { AudioService } from '../../shared/audio.service';
import { VocabService } from '../../vocab/vocab.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() content: any[];
  playerContents: any[];
  currentItem = 0;
  private queue: string[];
  contentsLoaded = false;
  private listenToAdvanceEvent = true;
  private nextTask = 0;
  done = false;
  private loopSubscription: ISubscription;

  constructor(private lessonService: LessonService,
              private audioService: AudioService,
              private vocabService: VocabService,
              private objectiveService: ObjectiveService) { }

  ngOnInit() {
    this.initializeContent();
  }

  initializeContent() {
    this.playerContents = [];
    this.queue = new Array(this.playerContents.length);
    this.queue[0] = 'ready';
    this.loopSubscription = interval(100)
      .subscribe(() => this.attemptNextQueueItem());
  }

  attemptNextQueueItem() {
    if (this.queue[this.nextTask] === 'ready') {
      this.queue[this.nextTask] = 'working';
      this.performCurrentQueueItem();
    }
  }

  performCurrentQueueItem() {
    const contentItem = this.content[this.nextTask];
    switch (contentItem.type) {
      case 'lesson':
        this.initializeLesson(contentItem.id);
        break;
      case 'objective':
        this.initializeObjective(contentItem.objectiveId, contentItem.levelId);
        break;
      default:
        console.error('Error initializing content: Item was an unknown type.');
    }
  }

  initializeLesson(lessonId: string) {
    if (lessonId) {
      this.lessonService.get(lessonId)
        .subscribe(
          lesson => {
          lesson.lines.forEach(line => {
            this.initializeLine(line);
          });
        },
          err => console.error('There was an error fetching lesson contents: ' + err),
        () => this.enableNextTaskInQueue()
        );
    } else {
      console.error('Item did not have an id set.');
    }
  }

  initializeLine(line: Line) {
    switch (line.type) {
      case 'Example':
        const newExample = new LineExample();
        newExample.vocabReference = line.exampleVocabReference;
        this.vocabService.get(line.exampleVocabReference)
          .subscribe(data => newExample.vocab = data);
        this.playerContents.push({type: 'lineExample', content: newExample});
        break;
      case 'Explanation':
        const newExplanation = new LineExplanation();
        newExplanation.audioNarration = this.audioService.initializeAudioFromFilePath(line.explanationAudioMp3);
        newExplanation.audioScript = line.explanationAudioScript;
        newExplanation.videoScript = line.explanationVideoScript;
        this.playerContents.push({type: 'lineExplanation', content: newExplanation});
        break;
      case 'Multiple Choice':
        const newMultipleChoice = new LineQuestionMc();
        newMultipleChoice.question = line.mcQuestion;
        newMultipleChoice.answerCorrect = line.mcAnswerCorrect;
        newMultipleChoice.answerIncorrect = [];
        newMultipleChoice.answerIncorrect.push(line.mcAnswerIncorrect1);
        newMultipleChoice.answerIncorrect.push(line.mcAnswerIncorrect2);
        newMultipleChoice.answerIncorrect.push(line.mcAnswerIncorrect3);
        this.playerContents.push({type: 'lineMultipleChoice', content: newMultipleChoice});
        break;
      default:
        console.error('Error initializing line.');
    }
  }

  initializeObjective(objectiveId: string, levelId: string) {
    console.log('We made it into initializeObjective');
    if (objectiveId) {
      this.objectiveService.get(objectiveId)
        .subscribe(
          objective => {
            console.log(objective);
            const matchedLevel: Level = objective.levels.find(level => level.id === levelId);
            matchedLevel.tasks.forEach(task => {
              this.playerContents.push({type: 'task', content: task, parentObjective: objective});
            });
          },
          err => console.error('Error getting objective: ' + err),
          () => this.enableNextTaskInQueue()
        );
    } else {
      console.error('Item did not have an id set.');
    }
  }

  enableNextTaskInQueue() {
    this.queue[this.nextTask] = 'done';
    if (this.nextTask < this.content.length - 1) {
      this.nextTask++;
      this.queue[this.nextTask] = 'ready';
    } else {
      this.contentsLoaded = true;
      this.loopSubscription.unsubscribe();
    }
  }

  onAdvance(): void {
    if (this.currentItem >= this.playerContents.length - 1) {
      this.done = true;
      return;
    }
    if (this.listenToAdvanceEvent) { // prevents event bubbling
      this.listenToAdvanceEvent = false;
      this.currentItem++;
      setTimeout(() => {
        this.listenToAdvanceEvent = true;
      }, 100);
    }
  }

}
