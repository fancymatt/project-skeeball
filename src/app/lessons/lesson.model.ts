import {Line} from './lines/line.model';

export class Lesson {
  constructor(public name: string, public type: string, public completed: boolean, public lines: Line[]) {
  }
}
