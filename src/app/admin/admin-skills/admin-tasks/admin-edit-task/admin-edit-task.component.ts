import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SkillService } from '../../../../services/skill.service';
import { Task } from '../../../../models/task.model';
import { Skill } from '../../../../models/skill.model';
import { PatternItem } from '../../../../models/pattern-item.model';
import { VocabService } from '../../../../services/vocab.service';
import { Vocab } from '../../../../models/vocab.model';
import { Lesson } from '../../../../models/lesson.model';
import { LessonService } from '../../../../services/lesson.service';

@Component({
  selector: 'app-admin-edit-task',
  templateUrl: './admin-edit-task.component.html',
  styleUrls: ['./admin-edit-task.component.css']
})
export class AdminEditTaskComponent implements OnInit {
  lessonList: Lesson[];
  selectedLessonId: string;

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
    this.lessonService.getAll()
      .subscribe(
        data => this.lessonList = data,
        err => console.error(err)
      );
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

  lessonForId(id: string) {
    const matchedLesson = this.lessonList.find(lesson => lesson.id === id);
    return matchedLesson.name;
  }

  addLessonToTask() {
    if (!this.selectedTask.lessons) {
      this.selectedTask.lessons = [];
    }
    this.selectedTask.lessons.push(this.selectedLessonId);
  }

}
