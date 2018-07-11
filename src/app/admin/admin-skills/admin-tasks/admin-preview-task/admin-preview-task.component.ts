import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-preview-task',
  templateUrl: './admin-preview-task.component.html',
  styleUrls: ['./admin-preview-task.component.css']
})
export class AdminPreviewTaskComponent implements OnInit {
  playerContent: any[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playerContent = [
      {
        type: 'skill',
        skillId: this.activatedRoute.snapshot.params.skill_id,
        taskId: this.activatedRoute.snapshot.params.task_id
      }
    ];
  }

}
