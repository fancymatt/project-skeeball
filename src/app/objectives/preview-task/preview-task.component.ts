import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-task',
  templateUrl: './preview-task.component.html',
  styleUrls: ['./preview-task.component.css']
})
export class PreviewTaskComponent implements OnInit {
  playerContent: any[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.playerContent = [
      {
        type: 'objective',
        objectiveId: this.activatedRoute.snapshot.params.obj_id,
        taskId: this.activatedRoute.snapshot.params.task_id
      }
    ];
  }

}
