import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-preview-skill',
  templateUrl: './admin-preview-skill.component.html',
  styleUrls: ['./admin-preview-skill.component.css']
})
export class AdminPreviewSkillComponent implements OnInit {
  playerContent: any[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params);
    this.playerContent = [
      {
        type: 'skill',
        skill_id: this.activatedRoute.snapshot.params.skill_id,
        levelId: this.activatedRoute.snapshot.params.level_id
      }
    ];
  }
}
