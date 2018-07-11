import { PatternItem } from './pattern-item.model';

export class Task {
  id: string;
  name: string;
  pattern: PatternItem[];

  constructor(name: string) {
  }
}
