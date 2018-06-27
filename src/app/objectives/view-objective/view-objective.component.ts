import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ObjectiveService } from '../objective.service';

@Component({
  selector: 'app-view-objective',
  templateUrl: './view-objective.component.html',
  styleUrls: ['./view-objective.component.css']
})
export class ViewObjectiveComponent implements OnInit {
  get selectedObjective() {
    return this.objectiveService.selectedObjective;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private objectiveService: ObjectiveService) { }

  ngOnInit() {
    this.objectiveService.get(this.activatedRoute.snapshot.params.id)
      .subscribe(data => this.objectiveService.selectedObjective = data);
  }

  saveObjective() {
    this.objectiveService.update(this.selectedObjective)
      .subscribe(data => console.log('Finished saving'),
        err => console.error(err));
  }

}
