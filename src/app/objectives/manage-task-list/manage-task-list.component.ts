import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Objective } from '../objective.model';
import { Task } from '../task.model';
import { ObjectiveService } from '../objective.service';

@Component({
  selector: 'app-manage-task-list',
  templateUrl: './manage-task-list.component.html',
  styleUrls: ['./manage-task-list.component.css']
})
export class ManageTaskListComponent implements OnInit {
  @Input() objective: Objective;
  @Input() tasks: Task[];

  constructor(private router: Router, private objectiveService: ObjectiveService) { }

  ngOnInit() {
  }

  loadTask(task: Task) {
    this.objectiveService.selectedTask = task;
    const url = '/objectives/' + this.objectiveService.selectedObjective.id + '/' + task.id;
    this.router.navigateByUrl(url);
  }
}
