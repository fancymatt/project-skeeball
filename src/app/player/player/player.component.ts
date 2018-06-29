import { Component, Input, OnInit } from '@angular/core';
import { LessonService } from '../../lessons/lesson.service';
import { Line } from '../../lines/line.model';
import { LineExample } from '../../lines/line-example';
import { LineExplanation } from '../../lines/line-explanation';
import { LineQuestionMc } from '../../lines/line-question-mc';
import { ObjectiveService } from '../../objectives/objective.service';
import { Level } from '../../objectives/level.model';
import { interval } from 'rxjs';
import { ISubscription } from 'rxjs-compat/Subscription';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() content: any[];
  playerContents: any[];
  queue: string[];
  nextTask = 0;
  private loopSubscription: ISubscription;

  constructor(private lessonService: LessonService,
              private objectiveService: ObjectiveService) { }

  ngOnInit() {
    this.content = [
      {
        type: 'lesson',
        id: 'ef6697f9-66d3-47ab-b56f-b57ced97aa7e'
      },
      {
        type: 'lesson',
        id: '15c74269-a838-48b3-8ee6-69e0e7bb8503'
      },
      {
        type: 'objective',
        objectiveId: 'obj_0.8847845107569265',
        levelId: '1'
      }
    ];
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
        this.playerContents.push({type: 'lineExample', content: newExample});
        break;
      case 'Explanation':
        const newExplanation = new LineExplanation();
        newExplanation.audioNarrationUrl = line.explanationAudioMp3;
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
    if (objectiveId) {
      this.objectiveService.get(objectiveId)
        .subscribe(
          objective => {
            const matchedLevel: Level = objective.levels.find(level => level.id === levelId);
            matchedLevel.tasks.forEach(task => {
              this.playerContents.push(task);
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
      this.loopSubscription.unsubscribe();
    }
  }

}
