import { Component, Input, OnInit } from '@angular/core';

import { Objective } from '../objective.model';
import { ObjectiveService } from '../objective.service';
import { Level } from '../level.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-level-list',
  templateUrl: './manage-level-list.component.html',
  styleUrls: ['./manage-level-list.component.css']
})
export class ManageLevelListComponent implements OnInit {
  @Input() level: Level;
  objectiveId: string;

  get possiblePublishStatus() {
    return this.objectiveService.possiblePublishStatus();
  }

  constructor(private objectiveService: ObjectiveService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.objectiveId = this.activatedRoute.snapshot.params.id;
  }

}
