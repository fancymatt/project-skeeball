import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-preview-objective',
  templateUrl: './preview-objective.component.html',
  styleUrls: ['./preview-objective.component.css']
})
export class PreviewObjectiveComponent implements OnInit {
  playerContent: any[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params);
    this.playerContent = [
      {
        type: 'objective',
        objectiveId: this.activatedRoute.snapshot.params.obj_id,
        levelId: this.activatedRoute.snapshot.params.lev_id
      }
    ];
  }
}
