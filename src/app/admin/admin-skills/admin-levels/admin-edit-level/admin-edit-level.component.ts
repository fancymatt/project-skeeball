import { Component, Input, OnInit } from '@angular/core';

import { SkillService } from '../../../../services/skill.service';
import { Level } from '../../../../models/level.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-edit-level',
  templateUrl: './admin-edit-level.component.html',
  styleUrls: ['./admin-edit-level.component.css']
})
export class AdminEditLevelComponent implements OnInit {
  @Input() level: Level;
  skillId: string;

  get possiblePublishStatus() {
    return this.skillService.possiblePublishStatus();
  }

  constructor(private skillService: SkillService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.skillId = this.activatedRoute.snapshot.params.id;
  }

}
