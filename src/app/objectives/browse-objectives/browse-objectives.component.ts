import { Component, OnInit } from '@angular/core';

import { ObjectiveService } from '../objective.service';

@Component({
  selector: 'app-browse-objectives',
  templateUrl: './browse-objectives.component.html',
  styleUrls: ['./browse-objectives.component.css']
})
export class BrowseObjectivesComponent implements OnInit {
  get objectivesList() {
    return this.objectiveService.objectivesList;
  }

  constructor(private objectiveService: ObjectiveService) { }

  ngOnInit() {
  }

}
