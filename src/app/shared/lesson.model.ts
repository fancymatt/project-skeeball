import { Line } from './lines/line.model';

export class Lesson {
  public id: string;
  public name: string;
  public type: string;
  public lines: Line[];

  constructor(name: string,
              type: string,
              lines: Line[]) {
    this.id = '';
    this.name = name;
    this.type = type;
    this.lines = lines;
  }
}
