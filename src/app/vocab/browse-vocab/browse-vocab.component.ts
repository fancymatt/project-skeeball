import { Component, OnInit } from '@angular/core';
import { VocabService } from '../vocab.service';
import { Vocab } from '../vocab.model';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../shared/data.service';

@Component({
  selector: 'app-browse-vocab',
  templateUrl: './browse-vocab.component.html',
  styleUrls: ['./browse-vocab.component.css']
})
export class BrowseVocabComponent implements OnInit {
  vocabList: Vocab[];
  selectedVocab: Vocab;

  constructor(private activatedRoute: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllVocabs()
      .subscribe(
        (data) => {
          this.vocabList = data;
          console.log(data);
        },
        (err) => console.log(err),
        () => console.log('Finished receiving vocabulary list')
    );
  }

  onSelectVocab(id: string) {
    this.dataService.getVocab(id)
      .subscribe(
        (data) => {
          this.selectedVocab = data;
        },
        (err) => {
          console.log(err);
        },
        () => console.log('Finished fetching vocab')
      );
  }

}
