import { Component, OnInit } from '@angular/core';

import { VocabService } from '../vocab.service';
import { Vocab } from '../vocab.model';

@Component({
  selector: 'app-browse-vocab',
  templateUrl: './browse-vocab.component.html',
  styleUrls: ['./browse-vocab.component.css']
})
export class BrowseVocabComponent implements OnInit {
  vocabList: Vocab[];
  selectedVocab: Vocab;

  constructor(private vocabService: VocabService) {
  }

  ngOnInit() {
    this.vocabService.getAll()
      .subscribe(
        data => this.vocabList = data,
        err => console.error(err)
      );
  }

  onSelectVocab(id: string) {
    this.vocabService.get(id)
      .subscribe(
        data => this.selectedVocab = data,
        err => console.error(err)
      );
  }

}
