import { PatternItem } from './pattern-item.model';

export class Task {
  id: string;
  name: string;
  pattern: PatternItem[];

  constructor(name: string) {
    this.name = name;
    this.id = 'theid';
    this.pattern = [
      new PatternItem('Slot'),
      new PatternItem('Slot'),
      new PatternItem('Static')
    ];
  }
}
