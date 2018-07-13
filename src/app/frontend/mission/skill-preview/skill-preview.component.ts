import { Component, Input, OnInit } from '@angular/core';
import { Skill } from '../../../models/skill.model';

@Component({
  selector: 'app-skill-preview',
  templateUrl: './skill-preview.component.html',
  styleUrls: ['./skill-preview.component.css']
})
export class SkillPreviewComponent implements OnInit {
  @Input() skill: Skill;

  constructor() { }

  ngOnInit() {
  }

}
