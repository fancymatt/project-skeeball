export class PatternItem {
  type: string;
  slotName: string;
  staticVocabRef: string;
  wordBank: string[];
  lessons: string[];

  constructor(type: string) {
    this.type = type;
    this.wordBank = [];
    this.lessons = [];
  }
}
