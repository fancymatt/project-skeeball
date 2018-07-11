import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SkillService } from '../../../../shared/skills/skill.service';
import { Task } from '../../../../shared/skills/task.model';
import { Skill } from '../../../../shared/skills/skill.model';
import { PatternItem } from '../../../../shared/skills/pattern-item.model';
import { VocabService } from '../../../../shared/vocab.service';
import { Vocab } from '../../../../shared/vocab.model';
import { Lesson } from '../../../../shared/lesson.model';
import { LessonService } from '../../../../shared/lesson.service';

@Component({
  selector: 'app-admin-edit-task',
  templateUrl: './admin-edit-task.component.html',
  styleUrls: ['./admin-edit-task.component.css']
})
export class AdminEditTaskComponent implements OnInit {

  get selectedSkill(): Skill {
    return this.skillService.selectedSkill;
  }

  get selectedTask(): Task {
    return this.skillService.selectedTask;
  }

  set selectedTask(task: Task) {
    this.skillService.selectedTask = task;
  }

  constructor(private skillService: SkillService,
              private vocabService: VocabService,
              private lessonService: LessonService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initializeSelectedTask();
  }

  initializeSelectedTask() {
    this.skillService.selectedSkill.levels.forEach(level => {
      level.tasks.forEach(task => {
        if (task.id === this.activatedRoute.snapshot.params.id) {
          // Is this the best way to cast JSON to an object?
          // By separating task from objective, we need to push
          // task back into objective when saving
          // but I guess that's good because we can push all changes at once
          this.skillService.selectedTask.id = task.id;
          this.skillService.selectedTask.name = task.name;
          this.skillService.selectedTask.pattern = task.pattern;
        }
      });
    });
  }

  addPatternItem() {
    const newPatternItem = new PatternItem('String');
    this.selectedTask.pattern.push(newPatternItem);
  }

}
