import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Objective } from '../objective.model';
import { Task } from '../task.model';

@Component({
  selector: 'app-manage-task-list',
  templateUrl: './manage-task-list.component.html',
  styleUrls: ['./manage-task-list.component.css']
})
export class ManageTaskListComponent implements OnInit {
  @Input() objective: Objective;
  @Input() tasks: Task[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
