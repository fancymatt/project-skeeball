import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Vocab } from './vocab.model';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class VocabService {

  constructor(private dataService: DataService) { }

  // CRUD

  get(id: string): Observable<Vocab> {
    return this.dataService.getVocab(id);
  }

  getAll(): Observable<Vocab[]> {
    return this.dataService.getAllVocabs();
  }

}
