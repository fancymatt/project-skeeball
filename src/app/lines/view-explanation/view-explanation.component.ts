import { Component, Input, OnInit } from '@angular/core';
import { Line } from '../line.model';
import { LineExplanation } from '../line-explanation';

@Component({
  selector: 'app-view-explanation',
  templateUrl: './view-explanation.component.html',
  styleUrls: ['./view-explanation.component.css']
})
export class ViewExplanationComponent implements OnInit {
  @Input('line') genericLine: Line;
  line: LineExplanation = new LineExplanation();

  constructor() { }

  ngOnInit() {
    this.line.audioScript = this.genericLine.explanationAudioScript;
    this.line.videoScript = this.genericLine.explanationVideoScript;
  }

}
