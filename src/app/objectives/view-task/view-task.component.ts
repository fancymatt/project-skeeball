import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ObjectiveService } from '../objective.service';
import { Task } from '../task.model';
import { Objective } from '../objective.model';
import { PatternItem } from '../pattern-item.model';
import { VocabService } from '../../vocab/vocab.service';
import { Vocab } from '../../vocab/vocab.model';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnChanges {
  vocabList: Vocab[];
  patternItemTypes: string[];


  get selectedObjective(): Objective {
    return this.objectiveService.selectedObjective;
  }

  get selectedTask(): Task {
    return this.objectiveService.selectedTask;
  }

  set selectedTask(task: Task) {
    this.objectiveService.selectedTask = task;
  }

  constructor(private objectiveService: ObjectiveService,
              private vocabService: VocabService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initializeSelectedTask();
    this.vocabService.getAll()
      .subscribe(
        data => this.vocabList = data,
        err => console.error(err)
      );
    this.patternItemTypes = this.objectiveService.patternItemTypes();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  initializeSelectedTask() {
    this.objectiveService.selectedObjective.levels.forEach(level => {
      level.tasks.forEach(task => {
        if (task.id === this.activatedRoute.snapshot.params.id) {
          // Is this the best way to cast JSON to an object?
          // By separating task from objective, we need to push
          // task back into objective when saving
          // but I guess that's good because we can push all changes at once
          this.objectiveService.selectedTask.id = task.id;
          this.objectiveService.selectedTask.name = task.name;
          this.objectiveService.selectedTask.pattern = task.pattern;
        }
      });
    });
  }

  addPatternItem() {
    const newPatternItem = new PatternItem('String');
    this.selectedTask.pattern.push(newPatternItem);
  }

}
