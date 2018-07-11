import { Component, Input, OnInit } from '@angular/core';

import { PatternItem } from '../../../../models/pattern-item.model';
import { Vocab } from '../../../../models/vocab.model';
import { Task } from '../../../../models/task.model';
import { Skill } from '../../../../models/skill.model';
import { SkillService } from '../../../../services/skill.service';
import { VocabService } from '../../../../services/vocab.service';
import { Lesson } from '../../../../models/lesson.model';
import { LessonService } from '../../../../services/lesson.service';

@Component({
  selector: 'app-admin-edit-pattern-item',
  templateUrl: './admin-edit-pattern-item.component.html',
  styleUrls: ['./admin-edit-pattern-item.component.css']
})
export class AdminEditPatternItemComponent implements OnInit {
  @Input() patternItem: PatternItem;
  vocabList: Vocab[];
  lessonList: Lesson[];
  patternItemTypes: string[];
  selectedLessonId: string;
  selectedVocabId: string;

  get selectedSkill(): Skill {
    return this.skillService.selectedSkill;
  }

  get selectedTask(): Task {
    return this.skillService.selectedTask;
  }

  constructor(private skillService: SkillService,
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
    this.patternItemTypes = this.skillService.patternItemTypes();
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
