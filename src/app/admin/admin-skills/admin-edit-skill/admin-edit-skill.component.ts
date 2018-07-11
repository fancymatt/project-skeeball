import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SkillService } from '../../../services/skill.service';

@Component({
  selector: 'app-admin-edit-skill',
  templateUrl: './admin-edit-skill.component.html',
  styleUrls: ['./admin-edit-skill.component.css']
})
export class AdminEditSkillComponent implements OnInit {
  get selectedSkill() {
    return this.skillService.selectedSkill;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.get(this.activatedRoute.snapshot.params.id)
      .subscribe(data => this.skillService.selectedSkill = data);
  }

  saveSkill() {
    this.skillService.update(this.selectedSkill)
      .subscribe(data => console.log('Finished saving'),
        err => console.error(err));
  }

}
