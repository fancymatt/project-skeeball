import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  skillList: Skill[];

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getAll()
      .subscribe(data => this.skillList = data,
      err => console.error(err));
  }

}
