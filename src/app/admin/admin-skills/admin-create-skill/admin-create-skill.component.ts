import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-create-skill',
  templateUrl: './admin-create-skill.component.html',
  styleUrls: ['./admin-create-skill.component.css']
})
export class AdminCreateSkillComponent implements OnInit {
  newSkillForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  initializeForm() {
    this.newSkillForm = this.formBuilder.group({
      name: new FormControl,
      levels: '',
    });
  }

}
