import { Component, Input, OnInit } from '@angular/core';
import { Line } from '../line.model';
import { LineExample } from '../line-example';

@Component({
  selector: 'app-view-example',
  templateUrl: './view-example.component.html',
  styleUrls: ['./view-example.component.css']
})
export class ViewExampleComponent implements OnInit {
  @Input('line') genericLine: Line;
  line: LineExample = new LineExample;

  constructor() { }

  ngOnInit() {
    this.line.exampleTarget = this.genericLine.exampleTarget;
    this.line.exampleKana = this.genericLine.exampleKana;
    this.line.exampleRomanization = this.genericLine.exampleRomanization;
    this.line.exampleEnglish = this.genericLine.exampleEnglish;
  }

}
