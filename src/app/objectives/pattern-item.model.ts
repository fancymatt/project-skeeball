import { Lesson } from '../lessons/lesson.model';
import { Vocab } from '../vocab/vocab.model';

export class PatternItem {
  type: string;
  slotName: string;
  staticVocabRef: Vocab;
  wordBank: Vocab[];
  lessons: Lesson[];

  constructor(type: string) {
  }
}
