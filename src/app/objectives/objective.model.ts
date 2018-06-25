import { Level } from './level.model';

export class Objective {
  public id: string;
  public name: string;
  public levels: Level[];

  constructor(name: string) {
  }
}
