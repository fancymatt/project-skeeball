import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-line-editor',
  templateUrl: './line-editor.component.html',
  styles: []
})
export class LineEditorComponent implements OnInit {
  @Input() newLineType: string;

  constructor() { }

  ngOnInit() {
  }

}
