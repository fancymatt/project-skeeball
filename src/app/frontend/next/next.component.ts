import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/skill.model';
import { Level } from '../../models/level.model';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.css']
})
export class NextComponent implements OnInit {
  skillList: Skill[];
  nextSkill: Skill;
  nextSkillLevel: Level;

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.skillService.getAll()
      .subscribe(data => {
        this.skillList = data;
        this.setNextSkillLevel();
      },
        err => console.error(err));
  }

  setNextSkillLevel() {
    this.nextSkill = this.skillList[0];
    this.nextSkillLevel = this.nextSkill.levels[0];
  }

}
