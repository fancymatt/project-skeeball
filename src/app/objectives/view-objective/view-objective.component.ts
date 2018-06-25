import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Objective } from '../objective.model';
import { ObjectiveService } from '../objective.service';

@Component({
  selector: 'app-view-objective',
  templateUrl: './view-objective.component.html',
  styleUrls: ['./view-objective.component.css']
})
export class ViewObjectiveComponent implements OnInit {
  selectedObjective: Objective;

  constructor(private activatedRoute: ActivatedRoute, private objectiveService: ObjectiveService) { }

  ngOnInit() {
    this.selectedObjective = this.objectiveService.get(this.activatedRoute.snapshot.params.id);
  }

}
