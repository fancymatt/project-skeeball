import { Component, OnInit } from '@angular/core';

import { VocabService } from '../../../shared/vocab.service';
import { Vocab } from '../../../shared/vocab.model';

@Component({
  selector: 'app-admin-list-vocab',
  templateUrl: './admin-list-vocab.component.html',
  styleUrls: ['./admin-list-vocab.component.css']
})
export class AdminListVocabComponent implements OnInit {
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
