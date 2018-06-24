import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-objective',
  templateUrl: './add-objective.component.html',
  styleUrls: ['./add-objective.component.css']
})
export class AddObjectiveComponent implements OnInit {
  newObjectiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  initializeForm() {
    this.newObjectiveForm = this.formBuilder.group({
      name: new FormControl,
      levels: '',
    });
  }

}
