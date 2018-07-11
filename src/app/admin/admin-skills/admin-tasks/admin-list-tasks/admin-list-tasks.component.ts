import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Skill } from '../../../../models/skill.model';
import { Task } from '../../../../models/task.model';
import { SkillService } from '../../../../services/skill.service';

@Component({
  selector: 'app-admin-list-tasks',
  templateUrl: './admin-list-tasks.component.html',
  styleUrls: ['./admin-list-tasks.component.css']
})
export class AdminListTasksComponent implements OnInit {
  @Input() skill: Skill;
  @Input() tasks: Task[];

  constructor(private router: Router, private skillService: SkillService) { }

  ngOnInit() {
  }

  loadTask(task: Task) {
    this.skillService.selectedTask = task;
    const url = 'admin/skills/' + this.skillService.selectedSkill.id + '/' + task.id;
    this.router.navigateByUrl(url);
  }
}
