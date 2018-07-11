import { Level } from './level.model';

export class Skill {
  public id: string;
  public name: string;
  public levels: Level[];

  constructor(name: string) {
  }
}
