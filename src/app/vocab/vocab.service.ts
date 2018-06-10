import { Injectable } from '@angular/core';
import { Vocab } from './vocab.model';

@Injectable({
  providedIn: 'root'
})
export class VocabService {
  private vocabList = [
    new Vocab('1', '猫', 'ねこ', 'neko', 'cat'),
    new Vocab('2', '犬', 'いぬ', 'inu', 'dog'),
    new Vocab('3', 'ある', 'ある', 'aru', 'to exist (inanimate)'),
    new Vocab('4', '飲む', 'のむ', 'nomu', 'to drink'),
    new Vocab('5', '元気', 'げんき', 'genki', 'energetic')
  ];

  constructor() { }

  getVocabList(): Vocab[] {
    return this.vocabList;
  }

  getVocab(id: string): Vocab {
    return this.vocabList.find((vocab) => { return vocab.id === id; });
  }
}
