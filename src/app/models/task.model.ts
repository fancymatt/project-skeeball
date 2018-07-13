import { PatternItem } from './pattern-item.model';
import { Lesson } from './lesson.model';

export class Task {
  id: string;
  name: string;
  pattern: PatternItem[];
  lessons: string[] = [];

  constructor(name: string) {
  }
}
