import { Component, OnInit } from '@angular/core';

import { SkillService } from '../../../services/skill.service';
import { Skill } from '../../../models/skill.model';

@Component({
  selector: 'app-admin-list-skills',
  templateUrl: './admin-list-skills.component.html',
  styleUrls: ['./admin-list-skills.component.css']
})
export class AdminListSkillsComponent implements OnInit {
  skillsList: Skill[];

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getAll()
      .subscribe(data => this.skillsList = data);
  }

}
