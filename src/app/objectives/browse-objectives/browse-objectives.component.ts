import { Component, OnInit } from '@angular/core';

import { ObjectiveService } from '../objective.service';
import { Objective } from '../objective.model';

@Component({
  selector: 'app-browse-objectives',
  templateUrl: './browse-objectives.component.html',
  styleUrls: ['./browse-objectives.component.css']
})
export class BrowseObjectivesComponent implements OnInit {
  objectivesList: Objective[];

  constructor(private objectiveService: ObjectiveService) { }

  ngOnInit() {
    this.objectiveService.getAll()
      .subscribe(data => this.objectivesList = data);
  }

}
