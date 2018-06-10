import { Component, OnInit } from '@angular/core';
import { VocabService } from '../vocab.service';
import { Vocab } from '../vocab.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-browse-vocab',
  templateUrl: './browse-vocab.component.html',
  styleUrls: ['./browse-vocab.component.css']
})
export class BrowseVocabComponent implements OnInit {
  vocabList: Vocab[];
  selectedVocab: Vocab;

  constructor(private activatedRoute: ActivatedRoute,
              private vocabService: VocabService) { }

  ngOnInit() {
    this.vocabList = this.vocabService.getVocabList();
    if (this.activatedRoute.snapshot.params.id) {
      this.onSelectVocab(this.activatedRoute.snapshot.params.id);
    }
  }

  onSelectVocab(id: string) {
    this.selectedVocab = this.vocabService.getVocab(id);
  }

}
