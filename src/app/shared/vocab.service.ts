import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Vocab } from './vocab.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class VocabService {

  constructor(private dataService: DataService) { }

  // CRUD
  create(newVocab: Vocab): Observable<Vocab> {
    return this.dataService.createVocab(newVocab);
  }

  get(id: string): Observable<Vocab> {
    return this.dataService.getVocab(id);
  }

  getAll(): Observable<Vocab[]> {
    return this.dataService.getAllVocabs();
  }

  update(updatedVocab: Vocab): Observable<void> {
    return this.dataService.updateVocab(updatedVocab);
  }

  delete(deletedVocab: Vocab): Observable<void> {
    return this.dataService.deleteVocab(deletedVocab);
  }

}
