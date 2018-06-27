import { Component, Input, OnInit } from '@angular/core';

import { PatternItem } from '../pattern-item.model';
import { Vocab } from '../../vocab/vocab.model';
import { Task } from '../task.model';
import { Objective } from '../objective.model';
import { ObjectiveService } from '../objective.service';
import { VocabService } from '../../vocab/vocab.service';
import { Lesson } from '../../lessons/lesson.model';
import { LessonService } from '../../lessons/lesson.service';

@Component({
  selector: 'app-edit-pattern-item',
  templateUrl: './edit-pattern-item.component.html',
  styleUrls: ['./edit-pattern-item.component.css']
})
export class EditPatternItemComponent implements OnInit {
  @Input() patternItem: PatternItem;
  vocabList: Vocab[];
  lessonList: Lesson[];
  patternItemTypes: string[];
  selectedLessonId: string;
  selectedVocabId: string;

  get selectedObjective(): Objective {
    return this.objectiveService.selectedObjective;
  }

  get selectedTask(): Task {
    return this.objectiveService.selectedTask;
  }

  constructor(private objectiveService: ObjectiveService,
              private lessonService: LessonService,
              private vocabService: VocabService) { }

  ngOnInit() {
    this.vocabService.getAll()
      .subscribe(
        data => this.vocabList = data,
        err => console.error(err)
      );
    this.lessonService.getAll()
      .subscribe(
        data => this.lessonList = data,
        err => console.error(err)
      );
    this.patternItemTypes = this.objectiveService.patternItemTypes();
  }

  vocabForId(id: string): Vocab {
    return this.vocabList.find(vocab => {
      return vocab.id === id;
    });
  }

  lessonForId(id: string): Lesson {
    return this.lessonList.find(lesson => {
      return lesson.id === id;
    });
  }

  addVocabToPatternItem(): void {
    if (!this.patternItem.wordBank) {
      this.patternItem.wordBank = [];
    }
    this.patternItem.wordBank.push(this.selectedVocabId);
  }

  addLessonToPatternItem(): void {
    if (!this.patternItem.lessons) {
      this.patternItem.lessons = [];
    }
    this.patternItem.lessons.push(this.selectedLessonId);
  }

}
