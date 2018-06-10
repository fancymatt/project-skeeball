import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Vocab} from '../vocab.model';

@Component({
  selector: 'app-view-vocab',
  templateUrl: './view-vocab.component.html',
  styleUrls: ['./view-vocab.component.css']
})
export class ViewVocabComponent {
  @Input() selectedVocab: Vocab;

  constructor() { }

  ngOnInit() {
  }


}
