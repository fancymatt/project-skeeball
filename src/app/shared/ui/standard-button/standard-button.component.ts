import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-button',
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.css']
})
export class StandardButtonComponent implements OnInit {
  @Input() buttonText: string;

  constructor() { }

  ngOnInit() {
    console.log(this.buttonText);
    if (!this.buttonText) {
      this.buttonText = 'Unconfigured Button';
    }
  }

}
